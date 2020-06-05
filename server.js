const mongoose = require('mongoose');
const app = require('./lib/app');

mongoose.connect('mongodb://localhost:21740/hilarity', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(3000, () => {
  console.log('Started on 3000');
});
