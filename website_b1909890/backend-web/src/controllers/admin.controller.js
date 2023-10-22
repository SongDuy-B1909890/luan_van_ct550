// const jwt = require('jsonwebtoken');

const { ref, child, set, get, push, update} = require('firebase/database');
const { database } = require('../models/database');
const dbRef = ref(database);

const login = async (req, res) => {
  try {
    const adminSnapshot = await get(child(dbRef, 'admin'));
    const admin = adminSnapshot.val();

    const existingAdmin = Object.values(admin).find(
      (admin) => admin.email === req.body.email && admin.password === req.body.password
    );

    if (existingAdmin) {
      // Đăng nhập thành công
      res.status(200).json({ message: 'Đăng nhập thành công' });
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
    const adminSnapshot = await get(child(dbRef, 'admin'));
    const admin = adminSnapshot.val();

    const existingAdmin = Object.values(admin).find(
      (admin) => admin.id === req.body.id || admin.email === req.body.email || admin.password === req.body.password
    );

    if (existingAdmin) {
      // Dữ liệu đã tồn tại, không thêm người dùng mới
      res.status(400).json({ error: 'Người dùng đã tồn tại' });
    } else {
      // Tạo ID tự động cho người dùng mới
      const newAdminRef = push(child(dbRef, 'admin'));
      const newAdminId = newAdminRef.key;

      set(newAdminRef, {
        id: newAdminId,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      res.status(200).json({ message: 'Dữ liệu đã được thêm thành công', adminId: newAdminId });
    }
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm người dùng', errorMessage: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    // Kiểm tra email và mật khẩu hiện tại
    const adminSnapshot = await get(child(dbRef, 'admin'));
    const admin = adminSnapshot.val();

    const existingAdminKey = Object.keys(admin).find(
      (adminKey) => admin[adminKey].email === req.body.email && admin[adminKey].password === req.body.password
    );

    if (!existingAdminKey) {
      // Sai thông tin đăng nhập
      res.status(401).json({ error: 'Sai thông tin đăng nhập' });
      return;
    } else {
      // Cập nhật mật khẩu mới
      const adminRef = child(dbRef, `admin/${existingAdminKey}`);
      update(adminRef, {
        password: req.body.newPassword
      });

      res.status(200).json({ message: 'Mật khẩu đã được thay đổi thành công' });
    }    
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi thay đổi mật khẩu', errorMessage: error.message });
  } 
};

module.exports = { login, register, changePassword };  