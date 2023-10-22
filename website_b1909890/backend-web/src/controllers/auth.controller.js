
// const jwt = require('jsonwebtoken');

const { ref, child, set, get, push} = require('firebase/database');
const { database } = require('../models/database');
const dbRef = ref(database);

const login = async (req, res) => {
  get(child(dbRef, 'users'))
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
};
  

// const register = async (req, res) => {
//   try {
//     set(child(dbRef, `users/3`), {
//       id: req.body.id,
//       name: req.body.name,
//       email: req.body.email
//     });

//     res.status(200).json({ message: 'Dữ liệu đã được thêm thành công vào Firebase Realtime Database' });
//   } catch (error) {
//     res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm người dùng' });
//   }
// };
const register = async (req, res) => {
  try {
    const usersSnapshot = await get(child(dbRef, 'users'));
    const users = usersSnapshot.val();

    const existingUser = Object.values(users).find(
      (user) => user.id === req.body.id || user.email === req.body.email || user.password === req.body.password
    );

    if (existingUser) {
      // Dữ liệu đã tồn tại, không thêm người dùng mới
      res.status(400).json({ error: 'Người dùng đã tồn tại' });
    } else {
      // Tạo ID tự động cho người dùng mới
      const newUserRef = push(child(dbRef, 'users'));
      const newUserId = newUserRef.key;

      set(newUserRef, {
        id: newUserId,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      res.status(200).json({ message: 'Dữ liệu đã được thêm thành công', userId: newUserId });
    }
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm người dùng', errorMessage: error.message });
  }
};

module.exports = { login, register };