const mongoose = require("mongoose");

const schema = mongoose.Schema;

const UserSchema = new schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true // Allows null for non-Google users
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: function() { return !this.googleId; }
  },
  phone: {
    type: String,
    required: function() { return !this.googleId; }
  },
  password: {
    type: String,
    required: function() { return !this.googleId; }
  },
  confirmPassword: {
    type: String,
    required: function() { return !this.googleId; }
  },
  role: {
    type: String,
    enum: ['customer', 'driver', 'admin'],
    default: 'customer'
  }
});

module.exports = mongoose.model("User", UserSchema);