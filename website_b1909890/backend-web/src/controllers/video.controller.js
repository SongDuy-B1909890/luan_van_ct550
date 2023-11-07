const cloudinary = require("../configs/cloudinary.config");
const { ref, child, push, get, set, update, } = require('firebase/database');

const { database } = require('../models/database');
const dbRef = ref(database);

// const uploadVideo = async (req, res) => {
//     try {
//         const uploadRef = child(dbRef, 'videos');
//         cloudinary.uploader.upload(req.file.path, {
//             resource_type: "video",
//             folder: "video",
//         }, (err, result) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).send(err);
//             }
//             const newUpload = { // Đổi tên biến thành newUpload
//                 cloudinary_id: result.public_id,
//                 name_file: req.file.originalname,
//                 url_video: result.url,
//                 // nhập
//                 id_user: req.body.id_user,
//                 title: req.body.title,
//                 description: req.body.description,
//                 category: req.body.category
//             };

//             push(uploadRef, newUpload)
//                 .then((snapshot) => {
//                     console.log('Upload added successfully');
//                     const response = {
//                         message: 'Upload added successfully',
//                         key: snapshot.key
//                     };
//                     return res.status(200).send(response);

//                 })
//                 .catch((error) => {
//                     console.error('Error adding upload:', error);
//                     return res.status(500).send(error);
//                 });
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ error: 'Đã xảy ra lỗi khi tải video', errorMessage: error.message });
//     }
// }

const uploadVideo = async (req, res) => {
    try {
        const uploadRef = child(dbRef, 'videos');
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "video",
            folder: "video",
        });

        const now = Date.now();
        const date = new Date(now);
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);

        const parts = formattedDate.split('/'); // Tách chuỗi thành các phần tử
        const reversedDate = `${parts[1]}/${parts[0]}/${parts[2]}`; // Đảo ngược định dạng ngày/tháng

        const newUpload = {
            cloudinary_id: result.public_id,
            name_file: req.file.originalname,
            url_video: result.url,
            id_user: req.body.id_user,
            title: req.body.title,
            description: req.body.description,
            id_category: req.body.id_category,
            status: 'chờ xem xét',
            created_at: reversedDate
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
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Đã xảy ra lỗi khi tải video', errorMessage: error.message });
    }
};

const deleteVideoAndContent = async (req, res) => {
    try {
        const videoKey = req.body.videoKey;

        // Lấy thông tin video từ Firebase Realtime Database
        const videosRef = ref(dbRef, `videos/${videoKey}`);
        const snapshot = await get(videosRef);

        if (!snapshot.exists()) {
            console.log('Video not found on Firebase Realtime Database');
            return res.status(404).send({ message: 'Video not found' });
        }

        const videoData = snapshot.val();
        const cloudinaryId = videoData.cloudinary_id;

        // Xóa video trên Cloudinary
        cloudinary.uploader.destroy(cloudinaryId, (err, result) => {
            if (err) {
                console.log(err);
                throw new Error('Lỗi khi xóa video trên Cloudinary');
            }
            console.log('Video deleted successfully on Cloudinary');
        });

        // Xóa nội dung trên Firebase Realtime Database
        await set(videosRef);
        console.log('Video deleted successfully on Firebase Realtime Database');

        return res.status(200).send({ message: 'Video and content deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Đã xảy ra lỗi khi xóa video và nội dung', errorMessage: error.message });
    }
};

// const videos = async (req, res) => {
//     get(child(dbRef, 'videos'))
//         .then((snapshot) => {
//             if (snapshot.exists()) {
//                 res.status(200).json(snapshot.val());
//             } else {
//                 res.status(404).json({ message: 'No data available' });
//             }
//         })
//         .catch((error) => {
//             res.status(500).json({ error: error.message });
//         });
// }

// const videos = async (req, res) => {
//     try {
//         const snapshot = await get(child(dbRef, 'videos'));
//         if (snapshot.exists()) {
//             const videoList = [];
//             snapshot.forEach((childSnapshot) => {
//                 const video = childSnapshot.val();
//                 videoList.push(video);
//             });
//             res.status(200).json(videoList);
//         } else {
//             res.status(404).json({ message: 'No data available' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const videos = async (req, res) => {
    try {
        const snapshot = await get(child(dbRef, 'videos'));
        if (snapshot.exists()) {
            const videoList = [];
            snapshot.forEach((childSnapshot) => {
                const video = childSnapshot.val();
                videoList.push(video);
            });
            res.status(200).json(videoList);
        } else {
            res.status(404).json({ message: 'No data available' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const videosStatus01 = async (req, res) => {
    try {
        const snapshot = await get(child(dbRef, 'videos'));
        if (snapshot.exists()) {
            const videoList = [];
            snapshot.forEach((childSnapshot) => {
                const video = childSnapshot.val();
                if (video.status === 'chờ xem xét') {
                    videoList.push(video);
                }
            });
            res.status(200).json(videoList);
        } else {
            res.status(404).json({ message: 'No data available' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const videosStatus02 = async (req, res) => {
    try {
        const snapshot = await get(child(dbRef, 'videos'));
        if (snapshot.exists()) {
            const videoList = [];
            snapshot.forEach((childSnapshot) => {
                const video = childSnapshot.val();
                if (video.status === 'xem xét') {
                    videoList.push(video);
                }
            });
            res.status(200).json(videoList);
        } else {
            res.status(404).json({ message: 'No data available' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const videosStatus03 = async (req, res) => {
    try {
        const snapshot = await get(child(dbRef, 'videos'));
        if (snapshot.exists()) {
            const videoList = [];
            snapshot.forEach((childSnapshot) => {
                const video = childSnapshot.val();
                if (video.status === 'phản biện') {
                    videoList.push(video);
                }
            });
            res.status(200).json(videoList);
        } else {
            res.status(404).json({ message: 'No data available' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const videosStatus04 = async (req, res) => {
    try {
        const snapshot = await get(child(dbRef, 'videos'));
        if (snapshot.exists()) {
            const videoList = [];
            snapshot.forEach((childSnapshot) => {
                const video = childSnapshot.val();
                if (video.status === 'xác nhận') {
                    videoList.push(video);
                }
            });
            res.status(200).json(videoList);
        } else {
            res.status(404).json({ message: 'No data available' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const changeVideoStatus = async (req, res) => {
    try {

        const videosSnapshot = await get(child(dbRef, 'videos'));
        const videos = videosSnapshot.val();

        const existingVideoKey = Object.keys(videos).find(
            (videoKey) => videos[videoKey].cloudinary_id === req.body.id
        );

        if (!existingVideoKey) {
            // Sai thông tin đăng nhập
            res.status(401).json({ error: 'Sai id video' });
            return;
        } else {

            // Cập nhật mật khẩu mới
            const videosRef = child(dbRef, `videos/${existingVideoKey}`);
            update(videosRef, {
                status: req.body.status,
            });

            res.status(200).json({ message: 'Trạng thái video đã được thay đổi thành công' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi thay đổi trạng thái', errorMessage: error.message });
    }
};

const searchVideosByTitle = async (req, res) => {
    try {
        const searchTitle = req.body.title; // Lấy tiêu đề video từ body parameter

        if (!searchTitle) {
            // Body parameter 'title' không tồn tại hoặc không có giá trị
            res.status(400).json({ error: 'Thiếu thông tin tìm kiếm video' });
            return;
        }

        const videosSnapshot = await get(child(dbRef, 'videos'));
        const videos = videosSnapshot.val();

        const regex = new RegExp(searchTitle, 'i');
        const matchingVideos = Object.values(videos).filter((video) =>
            video.title && regex.test(video.title)
        );

        if (matchingVideos.length === 0) {
            // Không tìm thấy video phù hợp
            res.status(404).json({ message: 'Không tìm thấy video phù hợp' });
            return;
        }

        res.status(200).json({ videos: matchingVideos });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tìm kiếm video', errorMessage: error.message });
    }
};

module.exports = {
    uploadVideo,
    videos,
    videosStatus01,
    videosStatus02,
    videosStatus03,
    videosStatus04,
    changeVideoStatus,
    deleteVideoAndContent,
    searchVideosByTitle,
}