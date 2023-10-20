const express = require('express');
const app = express();
const port = 5000;

const { get, ref, child } = require('firebase/database');
const{ database } = require('./src/models/database');
const dbRef = ref(database);

get(child(dbRef, `users`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val()); 
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error); 
});

app.get('/', (req, res) => {
  res.send('home');
});
app.listen(port, () => {
  console.log(`Server đang chạy`)
});