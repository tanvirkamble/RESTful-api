const mongoose = require('mongoose')


const connectDB = (uri) => {
    return mongoose.connect(uri).then(console.log('db connected'));
};

module.exports = connectDB