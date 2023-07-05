require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const product_routes = require('./routes/products');
const connectDB = require('./db/connect');

app.get('/', (req, res) => {
  res.send('i am live');
});

//middleware or to set router
app.use('/api/products', product_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, function () {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
