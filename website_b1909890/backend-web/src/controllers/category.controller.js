const { ref, set, push, child } = require('firebase/database');
const { database } = require('../models/database');
const dbRef = ref(database);

const createCategory = async (req, res) => {
    try {

        // Đường dẫn tham chiếu đến danh mục mới
        const newCategoryRef = push(child(dbRef, 'categories'));
        const newCategoryId = newCategoryRef.key;

        const now = Date.now();
        const date = new Date(now);
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);

        const parts = formattedDate.split('/'); // Tách chuỗi thành các phần tử
        const reversedDate = `${parts[1]}/${parts[0]}/${parts[2]}`; // Đảo ngược định dạng ngày/tháng

        // Thiết lập giá trị của danh mục
        await set(newCategoryRef, {
            id: newCategoryId,
            name: req.body.name,
            description: req.body.description,
            created_at: reversedDate,
        });

        res.status(200).json({ success: true, message: 'Danh mục đã được tạo thành công' });
    } catch (error) {
        console.error('Lỗi khi tạo danh mục:', error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi tạo danh mục' });
    }
};

module.exports = {
    createCategory,

};