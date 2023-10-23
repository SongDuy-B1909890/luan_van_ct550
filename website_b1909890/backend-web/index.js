const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(express.json());
app.use(cors());

const { get, set, ref, child } = require('firebase/database');
const { database } = require('./src/models/database');
const dbRef = ref(database);

//const authenticateToken = require('./src/middlewares/auth')
//const adminenticateToken = require('./src/middlewares/admin')
//const staffenticateToken = require('./src/middlewares/staff')

const authRouter = require('./src/routes/auth.router');
const staffRouter = require('./src/routes/staff.router');
const adminRouter = require('./src/routes/admin.router');

//authRouter.use(authenticateToken)
//staffRouter.use(staffenticateToken)
//adminRouter.use(adminenticateToken)

app.use('/api', authRouter);
app.use('/api', staffRouter);
app.use('/api', adminRouter);

get(child(dbRef, `users`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

// set(child(dbRef, `users/8`), {
//   id: 9,
//   name: "name",
//   email: "duy@gmail.com"
// });

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

app.listen(port, () => {
  console.log(`Server đang chạy`)
});
