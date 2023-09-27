
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 5000;

app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('home');
});

app.listen(port, () => {
  console.log(`Server đang chạy`)
});

app.get('/c1', (req, res) => {
  res.send('Hello World!');
});