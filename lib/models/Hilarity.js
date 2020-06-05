const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  joke: {
    type: String,
    required: true
  },

  comedian: {
    type: String,
    maxlength: 250
  },
  
  laughs: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
});


module.exports = mongoose.model('Hilarity', schema);
