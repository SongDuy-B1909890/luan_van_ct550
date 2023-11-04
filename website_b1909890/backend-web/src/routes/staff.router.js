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

// Danh sách nhân viên nhóm 1
router.get('/staffs/group01', StaffController.staffsGroup01);

// Danh sách nhân viên nhóm 2
router.get('/staffs/group02', StaffController.staffsGroup02);

// Danh sách nhân viên nhóm 3
router.get('/staffs/group03', StaffController.staffsGroup03);

module.exports = router;