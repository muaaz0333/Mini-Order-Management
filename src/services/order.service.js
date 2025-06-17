const Order = require("../models/order");

const create = async (userId, products, total) => {
    return await Order.create({ user: userId, products, totalPrice: total });
};

const findAll = async (filter = {}) => {
    return Order.find(filter).populate("user products.product");

};

const findById = async (id) => {
    return Order.findById(id).populate("user products.product");

};

const updateStatus = async (id, status) => {
    return Order.findByIdAndUpdate(id, {status}, {new: true});
};

const findUserOrders = async (userId) => {
    return Order.find({user: userId}).populate("products.product");

};

module.exports = {
    create,
    findAll,
    findById,
    updateStatus,
    findUserOrders,
};

