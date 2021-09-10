/* eslint-disable max-len */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
  },
  authors: {
    type: [String],
    required: true,
  },
  published: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ['self-help', 'business', 'science', 'history', 'fantasy', 'romance', 'horror', 'thriller', 'mystery', 'biography', 'children', 'other'],
  },
  ItemCondition: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    enum: ['english', 'french', 'spanish', 'german', 'italian', 'other'],
    required: true,
  },
  publisher: {
    type: String,
  },
  edition: {
    type: String,
  },
}, {
  timestamps: true,
});
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
