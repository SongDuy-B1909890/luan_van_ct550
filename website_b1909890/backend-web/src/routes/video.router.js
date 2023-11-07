const express = require('express');
const router = express.Router();
const VideoController = require('../controllers/video.controller');

const storage = require('../configs/multer.config')

// Tải video
router.post('/uploadVideo', storage.single('file'), VideoController.uploadVideo);

// Danh sách video
router.get('/videos', VideoController.videos);

// Danh sách video
router.get('/admin/videos/status01', VideoController.videosStatus01);

// Danh sách video
router.get('/admin/videos/status02', VideoController.videosStatus02);

// Danh sách video
router.get('/admin/videos/status03', VideoController.videosStatus03);

// Danh sách video
router.get('/admin/videos/status04', VideoController.videosStatus04);

// Đổi trạng thái 
router.put('/admin/video/changeStatus', VideoController.changeVideoStatus);

// Xóa video
router.delete('/deleteVideo/:id', VideoController.deleteVideoAndContent);

// Tìm video theo tiêu đề 
router.post('/searchVideosByTitle', VideoController.searchVideosByTitle);

module.exports = router;

