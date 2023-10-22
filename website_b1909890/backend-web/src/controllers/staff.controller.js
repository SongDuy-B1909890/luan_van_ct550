// const jwt = require('jsonwebtoken');

const { ref, child, set, get, push} = require('firebase/database');
const { database } = require('../models/database');
const dbRef = ref(database);

const login = async (req, res) => {
  try {
    const staffsSnapshot = await get(child(dbRef, 'staffs'));
    const staffs = staffsSnapshot.val();

    const existingStaff = Object.values(staffs).find(
      (staff) => staff.email === req.body.email && staff.password === req.body.password
    );

    if (existingStaff) {
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
    const staffsSnapshot = await get(child(dbRef, 'staffs'));
    const staffs = staffsSnapshot.val();

    const existingStaff = Object.values(staffs).find(
      (staff) => staff.id === req.body.id || staff.email === req.body.email || staff.password === req.body.password
    );

    if (existingStaff) {
      // Dữ liệu đã tồn tại, không thêm người dùng mới
      res.status(400).json({ error: 'Người dùng đã tồn tại' });
    } else {
      // Tạo ID tự động cho người dùng mới
      const newStaffRef = push(child(dbRef, 'staffs'));
      const newStaffId = newStaffRef.key;

      set(newStaffRef, {
        id: newStaffId,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      res.status(200).json({ message: 'Dữ liệu đã được thêm thành công', staffId: newStaffId });
    }
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm người dùng', errorMessage: error.message });
  }
};

module.exports = { login, register };