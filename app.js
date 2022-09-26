const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { request } = require('express');
 
const app =  express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/lab3DB", {useNewUrlParser: true});

const itemSchema = new mongoose.Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  firstname: "John",
  lastname: "Doe"
})

const item2 = new Item({
  firstname: "Jane",
  lastname: "Doe"
})

const item3 = new Item({
  firstname: "James",
  lastname: "Bond"
})

const defaultItems = [item1, item2, item3];

app.get('/', (req, res) => {

  res.render('home', {
    listItems: defaultItems,
  })
})

app.post('/', (req, res) => {

});

app.get('/login', (req, res) => {
  res.render('login', {
    
  })
})

app.post('/login', (req, res) => {
  
  const username = req.body.username;
  const password = req.body.password;
  
  if (username === 'admin' && password === 'root') {
      res.redirect('/');
  } else if (username === '' || password.value === '') {
      alert("You did not enter any data.");
  } else if (username.length <= 3 || password.length <= 3) {
      alert("Password or Username must be longer than 3 characters.");
  } else {
      alert("Invalid credentials.");
  }
});

app.get('/form', (req, res) => {
  res.render('form', {

  })
})

app.post('/form', (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  let item = new Item({
    firstname: firstname,
    lastname: lastname
  });

  defaultItems.push(item);
  res.redirect('/');
})

app.listen(3000, () => {
  console.log("Server is up and running on port 3000!");
})