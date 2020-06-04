const express = require('express');
const app = express();
const Hilarity = require('./models/Hilarity');

app.use(require('cors')());
app.use(express.json());

//to post a joke
app.post('/hilarity', (req, res) => {
  Hilarity
    .create(req.body)
    .then(hilarity => res.send(hilarity));
});

//to get all jokes
app.get('/hilarity', (req, res) => {
  Hilarity
    .find()
    .then(hilarity => res.send(hilarity));
});

//to get one joke


module.exports = app;
