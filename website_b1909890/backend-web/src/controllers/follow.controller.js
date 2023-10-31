const { ref, child, set, get, push, update } = require('firebase/database');
const { database } = require('../models/database');
const dbRef = ref(database);