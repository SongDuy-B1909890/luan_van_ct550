const cloudinary = require("../configs/cloudinary.config");
const { ref, child, push, get, remove } = require('firebase/database');

const { database } = require('../models/database');
const dbRef = ref(database);

const uploadVideo = async (req, res) => {
    try {
        const uploadRef = child(dbRef, 'videos');
        cloudinary.uploader.upload(req.file.path, {
            resource_type: "video",
            folder: "video",
        }, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            const newUpload = { // Đổi tên biến thành newUpload
                cloudinary_id: result.public_id,
                name_file: req.file.originalname,
                url_video: result.url,
                title_video: req.body.title,
                description_video: req.body.description,
            };

            push(uploadRef, newUpload)
                .then((snapshot) => {
                    console.log('Upload added successfully');
                    const response = {
                        message: 'Upload added successfully',
                        key: snapshot.key
                    };
                    return res.status(200).send(response);

                })
                .catch((error) => {
                    console.error('Error adding upload:', error);
                    return res.status(500).send(error);
                });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Đã xảy ra lỗi khi tải video', errorMessage: error.message });
    }
}

const deleteVideo = async (req, res) => {
    try {
        const public_id = req.body.public_id; // Lấy public_id từ body request

        // Xóa video từ Cloudinary
        const result = await cloudinary.uploader.destroy(public_id);
        if (result.result !== 'ok') {
            console.error('Error deleting video from Cloudinary');
            return res.status(500).send({ error: 'Error deleting video from Cloudinary' });
        }

        // Xóa video từ Firebase Realtime Database
        const videoRef = child(dbRef, `videos/${public_id}`);
        await remove(videoRef);

        console.log('Video deleted successfully');
        return res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error('Error deleting video:', error);
        res.status(500).send({ error: 'Đã xảy ra lỗi khi xóa video', errorMessage: error.message });
    }
};

const videos = async (req, res) => {
    get(child(dbRef, 'videos'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                res.status(200).json(snapshot.val());
            } else {
                res.status(404).json({ message: 'No data available' });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
}

module.exports = {
    uploadVideo,
    videos,
    deleteVideo,
}