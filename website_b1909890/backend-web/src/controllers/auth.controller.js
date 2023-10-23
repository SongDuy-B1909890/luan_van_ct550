// const jwt = require('jsonwebtoken');

const { ref, child, set, get, push, update } = require('firebase/database');
const { database } = require('../models/database');
const dbRef = ref(database);

const jwt = require('jsonwebtoken');
const secretKey = 'LyHySD05'; // Thay thế bằng khóa bí mật của bạn

const login = async (req, res) => {
  try {
    const usersSnapshot = await get(child(dbRef, 'users'));
    const users = usersSnapshot.val();

    const existingUser = Object.values(users).find(
      (user) => user.email === req.body.email && user.password === req.body.password
    );

    if (existingUser) {
      // Đăng nhập thành công
      const token = jwt.sign({ email: existingUser.email }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ message: 'Đăng nhập thành công', token: token });
    } else {
      // Sai thông tin đăng nhập
      res.status(401).json({ error: 'Sai thông tin đăng nhập' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng nhập', errorMessage: error.message });
  }
};

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
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
      });

      res.status(200).json({ message: 'Dữ liệu đã được thêm thành công', userId: newUserId });
    }
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm người dùng', errorMessage: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    // Kiểm tra email và mật khẩu hiện tại
    const usersSnapshot = await get(child(dbRef, 'users'));
    const users = usersSnapshot.val();

    const existingUserKey = Object.keys(users).find(
      (userKey) => users[userKey].email === req.body.email && users[userKey].password === req.body.password
    );

    if (!existingUserKey) {
      // Sai thông tin đăng nhập
      res.status(401).json({ error: 'Sai thông tin đăng nhập' });
      return;
    } else {
      // Cập nhật mật khẩu mới
      const usersRef = child(dbRef, `users/${existingUserKey}`);
      update(usersRef, {
        password: req.body.newPassword
      });

      res.status(200).json({ message: 'Mật khẩu đã được thay đổi thành công' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi thay đổi mật khẩu', errorMessage: error.message });
  }
};

const users = async (req, res) => {
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
}

module.exports = {
  login,
  register,
  changePassword,
  users
};