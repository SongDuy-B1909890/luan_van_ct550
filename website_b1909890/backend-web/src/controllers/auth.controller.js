const admin = require('firebase-admin');
//const firebaseUser = require('firebase/app');
const jwt = require('jsonwebtoken');

const { get, set, ref, child } = require('firebase/database');
const{ database } = require('../models/database');
const dbRef = ref(database);



admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://ct550-b1909890-default-rtdb.firebaseio.com',
});

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Xác thực người dùng bằng email và mật khẩu
    const userRecord = await admin.auth().getUserByEmail(email);
    const uid = userRecord.uid;

    // Tạo token sử dụng JWT
    const token = jwt.sign({ uid }, 'your-secret-key');

    // Gửi token về phía client
    res.status(200).json({ token });
  } catch (error) {
    //res.status('Login error:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng nhập', error });
  }
};

// Hàm xử lý đăng ký
// const register = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Tạo người dùng trong Firebase Authentication
//     const userRecord = await admin.auth().createUser({
//       email,
//       password,
//     });

//     // Gửi thông tin người dùng về phía client
//     res.status(200).json({ uid: userRecord.uid });
//   } catch (error) {
//    // console.error('Register error:', email);
//     res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng ký' ,email});
//   }
// };

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error('Email is required');
    }

    // Tiếp tục xử lý đăng ký người dùng
    // ...
  } catch (error) {
    console.error('Register error:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, register };