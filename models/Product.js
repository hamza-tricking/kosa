const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number
  },
  costPrice: {
    type: Number
  },
  size: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isNew: {
    type: Boolean,
    default: false
  },
  quantity: {
    type: Number,
    default: 10
  },
  details: {
    benefits: [String],
    usage: {
      routine: String,
      tip: String,
      bestTime: String
    }
  }
}, {
  timestamps: true,
  suppressReservedKeysWarning: true
});

module.exports = mongoose.model('Product', productSchema);
