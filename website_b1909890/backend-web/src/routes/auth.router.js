const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// Đăng nhập
router.post('/login', AuthController.login);

// Đăng ký
router.post('/register', AuthController.register);

module.exports = router;