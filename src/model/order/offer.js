const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  offer_id: {
    type: String,
    required: true,
    unique: true,
  },
  offer_name: {
    type: String,
    required: true,
  },
  offer_description: {
    type: String,
    required: true,
  },
  offer_start_date: {
    type: Date,
    required: true,
  },
  offer_end_date: {
    type: Date,
    required: true,
  },
  offer_discount_percentage: {
    type: Number,
    required: true,
  },
  offer_status: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Offer = mongoose.model('Offer', OfferSchema);
module.exports = Offer;
