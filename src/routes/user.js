const express = require('express');
const user = express();
const { user: UserController } = require('../controllers');
const authentication = require('../helpers/auth');
const userController = new UserController();

user.post('/register', userController.register);
user.post('/logout', authentication, userController.logout);
user.post('/login', userController.login);

module.exports = user;
