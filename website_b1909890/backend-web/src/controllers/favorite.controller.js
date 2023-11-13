const { ref, get, set, child, update, push } = require('firebase/database');
const { database } = require('../models/database');
const dbRef = ref(database);

const createFavorite = async (req, res) => {
    try {
        const id = req.body.id;
        const id_video = req.body.id_video;

        if (!id_video) {
            throw new Error('Missing id_video');
        }

        const now = Date.now();
        const date = new Date(now);
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);

        const parts = formattedDate.split('/');
        const reversedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;

        const favoritesRef = child(dbRef, 'favorites');
        const newFavoriteRef = push(favoritesRef);
        const newFavoriteKey = newFavoriteRef.key;

        const snapshot = await get(favoritesRef);
        if (snapshot.exists()) {
            const favorites = snapshot.val();
            const existingFavoriteKey = Object.keys(favorites).find(key => favorites[key].id === id);
            if (existingFavoriteKey) {
                const existingFavorite = favorites[existingFavoriteKey];
                const existingIdVideos = Array.isArray(existingFavorite.id_videos) ? existingFavorite.id_videos : [];
                const updatedIdVideos = [...existingIdVideos, id_video];
                await update(child(favoritesRef, `${existingFavoriteKey}`), { id_videos: updatedIdVideos, created_at: reversedDate });
            } else {
                await set(child(favoritesRef, newFavoriteKey), {
                    id: id,
                    id_videos: [id_video],
                    created_at: reversedDate,
                });
            }
        } else {
            await set(child(favoritesRef, newFavoriteKey), {
                id: id,
                id_videos: [id_video],
                created_at: reversedDate,
            });
        }

        res.status(200).json({ success: true, message: 'Danh mục đã được tạo hoặc cập nhật thành công' });
    } catch (error) {
        console.error('Lỗi khi tạo hoặc cập nhật danh mục:', error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi tạo hoặc cập nhật danh mục' });
    }
};

module.exports = {
    createFavorite,
};