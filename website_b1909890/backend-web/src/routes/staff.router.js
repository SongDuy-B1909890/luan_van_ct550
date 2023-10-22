const express = require('express');
const router = express.Router();
const StaffController = require('../controllers/staff.controller');

// Đăng nhập
router.post('/login/staff', StaffController.login);

// Đăng ký
router.post('/register/staff', StaffController.register);

module.exports = router;