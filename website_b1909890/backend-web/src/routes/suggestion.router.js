const express = require('express');
const router = express.Router();
const SuggestionController = require('../controllers/suggestion.controller');

// Tạo danh mục
router.post('/staff/createSuggestion', SuggestionController.createSuggestion);

// Đổi danh mục
router.put('/staff/changeSuggestion', SuggestionController.changeSuggestion);

// Xóa danh mục
router.delete('/staff/deleteSuggestion', SuggestionController.deleteSuggestion);

// Danh sách danh mục
router.get('/staff/suggestions', SuggestionController.suggestions);

module.exports = router;