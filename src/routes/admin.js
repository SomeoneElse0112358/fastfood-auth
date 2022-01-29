const express = require('express');
const admin = express();
const { admin: AdminController } = require('../controllers');
const authentication = require('../helpers/auth');
const adminController = new AdminController();

admin.post('/login', adminController.login);
admin.post('/logout', authentication, adminController.logout);

module.exports = admin;
