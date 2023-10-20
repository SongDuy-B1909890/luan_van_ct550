// controllers/database.js
const databaseModel = require('../models/database');

const createData = (req, res) => {
  // Gọi phương thức tạo dữ liệu từ model
  databaseModel.createData(req.body)
    .then(() => {
      res.status(200).json({ message: 'Data created successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

const fetchData = (req, res) => {
  // Gọi phương thức lấy dữ liệu từ model
  databaseModel.fetchData()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

const updateData = (req, res) => {
  // Gọi phương thức cập nhật dữ liệu từ model
  const { id } = req.params;
  databaseModel.updateData(id, req.body)
    .then(() => {
      res.status(200).json({ message: 'Data updated successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

const deleteData = (req, res) => {
  // Gọi phương thức xóa dữ liệu từ model
  const { id } = req.params;
  databaseModel.deleteData(id)
    .then(() => {
      res.status(200).json({ message: 'Data deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

module.exports = {
  createData,
  fetchData,
  updateData,
  deleteData,
};