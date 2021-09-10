const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SmartPhoneSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  ram: {
    type: String,
    required: true,
  },
  IntenalMemory: {
    type: String,
    enum: ['32GB', '64GB', '128GB', '256GB', '512GB'],
    required: true,
  },
  screenSize: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    enum: ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Oppo', 'Vivo', 'LG'],
    required: true,
  },
  os: {
    type: String,
    enum: ['Android', 'IOS'],
    required: true,
  },
  colour: {
    type: String,
    required: true,
  },
  processor: {
    type: String,
    required: true,
  },
  warranty: {
    type: String,
    enum: ['1 year', '2 years', '3 years', '4 years', '5 years'],
    required: true,
  },
  camera: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});
const SmartPhone = mongoose.model('smartPhone', SmartPhoneSchema);
module.exports = SmartPhone;
