const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, default: 1 },
            },
        ],
        totalPrice: { type: Number, required: true },
        status: {
            type: String,
            enum: ['pending', 'shipped', 'delivered'],
            default: 'pending'
        },
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

module.exports = Order;

