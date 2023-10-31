const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');

// Tạo danh mục
router.post('/admin/category', CategoryController.createCategory);

// Đổi danh mục
router.put('/admin/changeCategory', CategoryController.changeCategory);

module.exports = router;