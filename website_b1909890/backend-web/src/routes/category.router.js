const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');

// Tạo danh mục
router.post('/admin/category', CategoryController.createCategory);

module.exports = router;