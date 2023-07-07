const express = require('express');
const ejs = require('ejs');
const app = express();
require('dotenv').config();

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 5000;

const product_routes = require('./routes/products');
const connectDB = require('./db/connect');

app.get('/', (req, res) => {
  res.send('I am live');
});

app.get('/api/doc', (req, res) => {
  res.render('documentation');
});

// Middleware to set up router
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
