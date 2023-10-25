const express = require('express');
const router = express.Router();
const VideoController = require('../controllers/video.controller');

const storage = require('../configs/multer.config')

// Tải video
router.post('/uploadVideo', storage.single('file'), VideoController.uploadVideo);

// Danh sách video
router.get('/videos', VideoController.videos);

// Xóa video
router.delete('/deleteVideo/:id', VideoController.deleteVideoAndContent);


module.exports = router;


