const express = require('express');
const router = express.Router();
const VideoController = require('../controllers/video.controller');

const storage = require('../configs/multer.config')

router.post('/uploadVideo', storage.single('file'), VideoController.uploadVideo);

// Danh sách video
router.get('/videos', VideoController.videos);


module.exports = router;


