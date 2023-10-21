const express = require('express');
const app = express();
const port = 5000;

const { get, set, ref, child } = require('firebase/database');
const{ database } = require('./src/models/database');
const dbRef = ref(database);

const authRouter = require('./src/routes/auth.router');
const { authenticateToken } = require('./src/middlewares/auth')

get(child(dbRef, `users`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val()); 
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error); 
}); 
 
set(child(dbRef, `users/7`), {
  id: 7,
  name: "name",
  email: "duy@gmail.com"
});

app.get('/', (req, res) => {
  res.send('home');
});

app.get('/staffs', (req, res) => {
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
});
app.get('/users', (req, res) => {
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
});

app.get('/admin', (req, res) => {
  get(child(dbRef, 'admin'))
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
});

app.use('/api', authRouter);

app.listen(port, () => { 
  console.log(`Server đang chạy`) 
});
