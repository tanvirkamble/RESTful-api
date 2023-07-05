const mongoose = require('mongoose');

const connectDB = (uri) => {
  return mongoose
    .connect(uri)
    .then(() => {
      console.log('db connected');
    })
    .catch((error) => {
      console.log('db not connected');
      console.log(error);
    });
};

module.exports = connectDB;
