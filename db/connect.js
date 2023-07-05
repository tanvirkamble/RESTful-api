const mongoose = require('mongoose');

const connectDB = (uri) => {
  return mongoose
    .connect(uri)
    .then(console.log('db connected'))
    .catch(console.log('db not connected'));
};

module.exports = connectDB;
