const express = require('express');
const router = express.Router();
const FavoriteController = require('../controllers/favorite.controller');

// Tạo danh mục
router.post('/createFavorite', FavoriteController.createFavorite);

// Danh sách danh mục
router.get('/favorites', FavoriteController.favorites);

module.exports = router;