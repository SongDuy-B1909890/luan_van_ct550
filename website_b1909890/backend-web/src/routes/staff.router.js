const express = require('express');
const router = express.Router();
const StaffController = require('../controllers/staff.controller');

// Đăng nhập
router.post('/login/staff', StaffController.login);

// Đăng ký
router.post('/register/staff', StaffController.register);

// Thay đổi mật khẩu
router.put('/changePassword/staff', StaffController.changePassword);

// Danh sách nhân viên
router.get('/staffs', StaffController.staffs);

module.exports = router;