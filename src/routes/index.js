const express = require('express');
const router = express();
const adminRoutes = require('./admin');
const userRoutes = require('./user');

router.use('/', userRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
