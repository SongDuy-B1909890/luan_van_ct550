// Import thư viện Firebase
import firebase from 'firebase/app';
import 'firebase/database';

const { database } = require('../models / database');
const dbRef = ref(database);

// Đọc file video khi người dùng chọn
document.getElementById('videoInput').addEventListener('change', (event) => {
    const videoFile = event.target.files[0];
    const videoReader = new FileReader();
    videoReader.readAsArrayBuffer(videoFile);

    videoReader.onload = () => {
        // Chuyển đổi ArrayBuffer thành Uint8Array
        const videoArrayBuffer = videoReader.result;
        const videoUint8Array = new Uint8Array(videoArrayBuffer);

        // Tải video lên Firebase Realtime Database
        const videosRef = get(child(dbRef, 'videos'));;
        const newVideoRef = videosRef.push();
        newVideoRef.set({
            video: videoUint8Array
        })
            .then(() => {
                console.log('Video tải lên thành công!');
            })
            .catch((error) => {
                console.error('Lỗi khi tải video lên:', error);
            });
    };
});