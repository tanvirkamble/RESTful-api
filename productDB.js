// this file (productDB.js) is responsible for initializing the database and performing operations such as deleting existing data and creating new documents based on a JSON file.

require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/product');

const ProductJson = require('./products.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Product.deleteMany().then(console.log('products deleted'));
    await Product.create(ProductJson)
      .then(() => {
        console.log('products JSON file connected');
      })
      .catch((err) => {
        console.log('products JSON file connection failed');
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

start();
