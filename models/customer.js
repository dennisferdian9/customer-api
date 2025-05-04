const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  number: Number,
  nameOfLocation: String,
  date: String,
  loginHour: String,
  name: String,
  age: Number,
  gender: String,
  email: String,
  noTelp: String,
  brandDevice: String,
  digitalInterest: String,
  locationType: String,
}, {
  timestamps: true,
  collection: 'customer' // ⬅️ Koleksi tetap bernama 'customer'
});

module.exports = mongoose.model('Customer', CustomerSchema);
