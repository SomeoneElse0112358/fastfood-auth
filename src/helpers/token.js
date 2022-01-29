const jwt = require('jsonwebtoken');

module.exports = (id, email, secretToken) => {
  const payload = {
    id,
    email
  };
  return jwt.sign(payload, secretToken, { expiresIn: '24h' });
};
