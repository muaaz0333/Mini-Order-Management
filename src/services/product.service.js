const Product = require("../models/Product");

async function findProductById (id) {
    const product = await Product.findById(id);
    if (!product) {
        throw new Error("Product not found")
    }
    return product
}

exports.findProductById = findProductById;

exports.create = async (payload) => {
    return Product.create(payload);
}

exports.update = async (id, payload) => {
    await findProductById(id)
    return Product.findByIdAndUpdate(id, payload, {new: true});
}

exports.delete = async (id) => {
    await findProductById(id);
    await Product.findByIdAndDelete(id);
    return {message: "Product deleted successfully."};
}

exports.list = async (page = 1, limit = 10, category) => {
    const filter = category ? { category } : {};

    return Product.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit));
}

