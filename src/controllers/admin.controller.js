const { admin } = require('../models');
const CommonController = require('./common.controller');

class AdminController extends CommonController {
  constructor() {
    super(admin);
    this.model = admin;
  }
  async login(req, res) {
    const currentAdmin = await this.model.findOne({ email: req.body.email });
    if (!currentAdmin)
      return res.status(404).send(`Email ${req.body.email} is not found!`);

    return super.login(req, res, currentAdmin);
  }
}

module.exports = AdminController;
