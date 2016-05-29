// require mongoose
var mongoose = require('mongoose');
// require crypto
var crypto = require('crypto');
// require jwt
var jwt = require('jsonwebtoken');

// define location Schema
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

// method used to store the password as a hash encrypted with a salt
userSchema.methods.setPwd = function(pwd) {
  // Create a random salt value using 32 bytes
  this.salt = crypto.randomBytes(32).toString('hex');
  // Create a random hash value with 100000 iterations and 512 keylen
  // as proposed by https://nodejs.org/api/crypto.html
  this.hash = crypto.pbkdf2Sync(pwd, this.salt, 100000, 512).toString('hex');
};

// method used to check wether a provided pwd matches the stored one or not
userSchema.methods.validatePwd = function(pwd) {
  var hash = crypto.pbkdf2Sync(pwd, this.salt, 100000, 512).toString('hex');
  return (this.hash === hash ? true : false);
};

// generate json web token
userSchema.methods.generateJWT = function() {

  // set expiry period
  var expiry = new Date();
  expiry.setDate(expiry.getDate() +1);

  // return a signed jwt
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000)
  }, process.env.JWT_SECRET);
};

// Create model out of schema
mongoose.model('User', userSchema);
