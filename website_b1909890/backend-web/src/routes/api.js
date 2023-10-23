const express = require('express');
const router = express.Router();
//const databaseModel = require('../models/database');
const databaseController = require('../controllers/database');

router.post('/', databaseController.createData);
router.get('/', databaseController.fetchData);
router.put('/:id', databaseController.updateData);
router.delete('/:id', databaseController.deleteData);

module.exports = router; 