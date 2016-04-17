// Require mongoose
var mongoose = require('mongoose');

// Define schemas
var commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    "default": Date.now
  }
});

var locationSchema = new mongoose.Schema({
  theme: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    "default": Date.now
  },
  datum: {
    type: Date,
    required: true
  },
  provided: [String],
  required: [String],
  participants: [String],
  coordinates: {
    type: [Number],
    index: '2dsphere'
  },
  afterwards: String,
  comments: [commentSchema]
});

// Create model out of schema
mongoose.model('Location', locationSchema);
