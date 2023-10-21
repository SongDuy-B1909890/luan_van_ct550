const jwt = require('jsonwebtoken');
const firebaseAdmin = require('firebase-admin');

// Middleware xác thực token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    // Xác minh token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Kiểm tra xem người dùng với UID trong token có tồn tại trong Firebase Authentication hay không
    await firebaseAdmin.auth().getUser(decodedToken.uid);

    // Gán thông tin người dùng vào request
    req.user = decodedToken;

    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

module.exports = {
  authenticateToken,
};