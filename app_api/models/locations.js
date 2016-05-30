// Require mongoose
var mongoose = require('mongoose');

// Define comments Schema, which is a subdocument of location schema
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

// Define location Schema
var locationSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
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
  coords: {
    type: [Number],
    index: '2dsphere'
  },
  afterwards: String,
  comments: [commentSchema]
});

// Create model out of schema
mongoose.model('Location', locationSchema);
