
const { ref, child, set, get, push, update } = require('firebase/database');
const { database } = require('../models/database');
const dbRef = ref(database);

const jwt = require('jsonwebtoken');
const secretKey = 'LyHySD0505'; // Thay thế bằng khóa bí mật của bạn

const login = async (req, res) => {
  try {
    const staffsSnapshot = await get(child(dbRef, 'staffs'));
    const staffs = staffsSnapshot.val();

    const existingStaff = Object.values(staffs).find(
      (staff) => staff.email === req.body.email && staff.password === req.body.password
    );

    if (existingStaff) {
      // Đăng nhập thành công
      // const token = jwt.sign({ email: existingStaff.email }, secretKey, { expiresIn: '1h' });
      // res.status(200).json({ message: 'Đăng nhập thành công', token: token });
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
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
      });

      res.status(200).json({ message: 'Dữ liệu đã được thêm thành công', staffId: newStaffId });
    }
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm người dùng', errorMessage: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    // Kiểm tra email và mật khẩu hiện tại
    const staffsSnapshot = await get(child(dbRef, 'staffs'));
    const staffs = staffsSnapshot.val();

    const existingStaffKey = Object.keys(staffs).find(
      (staffKey) => staffs[staffKey].email === req.body.email && staffs[staffKey].password === req.body.password
    );

    if (!existingStaffKey) {
      // Sai thông tin đăng nhập
      res.status(401).json({ error: 'Sai thông tin đăng nhập' });
      return;
    } else {
      // Cập nhật mật khẩu mới
      const staffsRef = child(dbRef, `staffs/${existingStaffKey}`);
      update(staffsRef, {
        password: req.body.newPassword
      });

      res.status(200).json({ message: 'Mật khẩu đã được thay đổi thành công' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi thay đổi mật khẩu', errorMessage: error.message });
  }
};

const staffs = async (req, res) => {
  get(child(dbRef, 'staffs'))
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
  staffs
};