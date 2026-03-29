const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    productName: String,
    amountPaid: Number,
    paymentStatus: { type: String, default: 'Completed' },
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);