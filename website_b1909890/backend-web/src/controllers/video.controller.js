const cloudinary = require("../configs/cloudinary.config");
const { ref, child, push, get } = require('firebase/database');

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
}