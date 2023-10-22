const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');

// Đăng nhập
router.post('/login/admin', AdminController.login);

// Đăng ký
router.post('/register/admin', AdminController.register);

module.exports = router;