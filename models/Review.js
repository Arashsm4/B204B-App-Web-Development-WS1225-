const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    reviewText: String,
    tipText: String,
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Review', reviewSchema);

// mainly most of these are inspired by my amazon project so nothing really new