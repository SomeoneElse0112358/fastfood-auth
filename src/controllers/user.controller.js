const bcrypt = require('bcrypt');
const { registerSchema } = require('../helpers/validation');
const { user } = require('../models');
const sendMail = require('../helpers/mailer');
const { emailOfSendler } = require('../helpers/config');
const CommonController = require('./common.controller');

class UserController extends CommonController {
  constructor() {
    super(user);
    this.model = user;
  }
  async register(req, res) {
    const validation = registerSchema.validate(req.body);
    if (validation.error) {
      return res.status(400).send(validation.error.details[0].message);
    }
    const emailExist = await this.model.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists!');

    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    try {
      const content = {
        subject: 'Welcome to our family!',
        text: `Dear, ${req.body.firstName}, You are successfully registered!`
      };
      const newUser = await this.model.create(req.body);
      sendMail(`"Administrator" <${emailOfSendler}>`, req.body.email, content);
      res.send(newUser);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async login(req, res) {
    const currentUser = await this.model.findOne({ email: req.body.email });
    if (!currentUser)
      return res.status(404).send(`Email ${req.body.email} is not found!`);

    return super.login(req, res, currentUser);
  }
}

module.exports = UserController;
