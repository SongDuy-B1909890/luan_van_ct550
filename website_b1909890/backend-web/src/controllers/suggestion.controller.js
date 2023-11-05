const { ref, set, push, child, get, update, remove } = require('firebase/database');
const { database } = require('../models/database');
const dbRef = ref(database);

const createSuggestion = async (req, res) => {
    try {

        // Đường dẫn tham chiếu đến danh mục mới
        const newSuggestionRef = push(child(dbRef, 'suggestions'));
        const newSuggestionId = newSuggestionRef.key;

        const now = Date.now();
        const date = new Date(now);
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);

        const parts = formattedDate.split('/'); // Tách chuỗi thành các phần tử
        const reversedDate = `${parts[1]}/${parts[0]}/${parts[2]}`; // Đảo ngược định dạng ngày/tháng

        // Thiết lập giá trị của danh mục
        await set(newSuggestionRef, {
            id: newSuggestionId,
            id_staff: req.body.id_staff,
            id_category: req.body.id_category,
            suggestion: req.body.suggestion,
            created_at: reversedDate,
        });

        res.status(200).json({ success: true, message: 'Đề xuất đã được tạo thành công' });
    } catch (error) {
        console.error('Lỗi khi tạo đề xuất:', error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi tạo đề xuất' });
    }
};

const changeSuggestion = async (req, res) => {
    try {

        const suggestionsSnapshot = await get(child(dbRef, 'suggestions'));
        const suggestions = suggestionsSnapshot.val();

        const existingSuggestionKey = Object.keys(suggestions).find(
            (suggestionKey) => suggestions[suggestionKey].id === req.body.id
        );

        if (!existingSuggestionKey) {
            // Sai thông tin đăng nhập
            res.status(401).json({ error: 'Sai thông tin id' });
            return;
        } else {

            // Cập nhật mật khẩu mới
            const suggestionsRef = child(dbRef, `suggestions/${existingSuggestionKey}`);
            update(suggestionsRef, {
                id_staff: req.body.staff,
                id_category: req.body.category,
                suggestion: req.body.suggestion,
            });

            res.status(200).json({ message: 'Đề xuất đã được thay đổi thành công' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi thay đổi đề xuất', errorMessage: error.message });
    }
};

const deleteSuggestion = async (req, res) => {
    try {
        const suggestionsSnapshot = await get(child(dbRef, 'suggestions'));
        const suggestions = suggestionsSnapshot.val();

        const existingSuggestionKey = Object.keys(suggestions).find(
            (suggestionKey) => suggestions[suggestionKey].id === req.body.id
        );

        if (!existingSuggestionKey) {
            res.status(401).json({ error: 'Sai thông tin đăng nhập' });
            return;
        } else {
            const categoriesRef = child(dbRef, `categories/${existingSuggestionKey}`);
            await remove(categoriesRef);

            res.status(200).json({ message: 'Đề xuất đã được xóa thành công' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa đề xuất', errorMessage: error.message });
    }
};

const suggestions = async (req, res) => {
    try {
        const snapshot = await get(child(dbRef, 'suggestions'));
        if (snapshot.exists()) {
            const suggestionsData = snapshot.val();
            const suggestionsArray = Object.values(suggestionsData);
            res.status(200).json(suggestionsArray);
        } else {
            res.status(404).json({ message: 'No data available' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createSuggestion,
    changeSuggestion,
    deleteSuggestion,
    suggestions,

};