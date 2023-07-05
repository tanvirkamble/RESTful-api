const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  index: { type: Number, required: true },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, 'price must be provided'],
    min: 0,
  },
  rating: {
    type: Number,
    default: 0.0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: [
        'apple',
        'samsung',
        'dell',
        'xiaomi',
        'hp',
        'oneplus',
        'lg',
        'sony',
        'google',
        'lenovo',
        'microsoft',
        'asus',
        'acer',
      ],
      message: `{values} value is not supported`,
    },
  },
});

module.exports = mongoose.model('product', ProductSchema);
