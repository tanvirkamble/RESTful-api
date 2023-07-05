require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/product');

const ProductJson = require('./products.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Product.deleteMany();
    await Product.create(ProductJson).then(console.log('JSON file connected'));
  } catch (error) {
    console.log(error);
  }
};

start();
