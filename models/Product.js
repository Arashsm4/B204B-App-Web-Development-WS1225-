const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, default: "https://via.placeholder.com/150" },
    priceCents: { type: Number, required: true },
    description: { type: String, default: "A reliable electronic component." },
    category: { type: String, default: "Electronics" }
});
module.exports = mongoose.model('Product', productSchema);