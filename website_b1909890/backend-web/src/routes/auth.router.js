const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// Đăng nhập
router.post('/login', AuthController.login);

// Đăng ký
router.post('/register', AuthController.register);

// Đổi mật khẩu
router.put('/changePassword', AuthController.changePassword);

// Danh sách user
router.get('/users', AuthController.users);

module.exports = router;