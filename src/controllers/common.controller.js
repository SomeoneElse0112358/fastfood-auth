const bcrypt = require('bcrypt');
const bind = require('auto-bind');
const { loginSchema } = require('../helpers/validation');
const generetateAccessToken = require('../helpers/token');
const { secretToken } = require('../helpers/config');

class CommonController {
  constructor() {
    bind(this);
  }

  async login(req, res, person) {
    const validation = loginSchema.validate(req.body);
    if (validation.error)
      return res.status(400).send(validation.error.details[0].message);

    const validPassword = await bcrypt.compare(
      req.body.password,
      person.password
    );
    if (!validPassword) return res.status(401).send('Invalid password!');

    const token = generetateAccessToken(person._id, person.email, secretToken);
    req.session.user = person.email;
    res.header('Authentication', token).send('Logged in!');
  }

  async logout(req, res) {
    if (req.session) {
      req.sessionStore.destroy(req.sessionID, (err) => {
        if (err) {
          return next(err);
        } else {
          return res.send('Logged out!');
        }
      });
    }
  }
}

module.exports = CommonController;
