const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');

// Tạo danh mục
router.post('/admin/createCategory', CategoryController.createCategory);

// Đổi danh mục
router.put('/admin/changeCategory', CategoryController.changeCategory);

// Xóa danh mục
router.delete('/admin/deleteCategory', CategoryController.deleteCategory);

module.exports = router;