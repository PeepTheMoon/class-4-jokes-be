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
app.get('/hilarity/:id', (req, res) => {
  Hilarity
    .findById(req.params.id)
    .then(hilarity => res.send(hilarity));
});

//patch to update a joke

module.exports = app;
