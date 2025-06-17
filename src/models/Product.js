const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.models.Product ||
    mongoose.model("Product", ProductSchema);

module.exports = Product;