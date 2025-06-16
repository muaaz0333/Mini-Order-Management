const productService = require("../services/product.service");

exports.create = async (req, res) => {
    try {
        const product = await productService.create(req.body);
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const product = await productService.update(req.params.id, req.body);
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.delete = async (req, res) => {
    try {
        await productService.delete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.list = async (req, res) => {
    try {
        const { page = 1, limit = 10, category } = req.query;

        const products = await productService.list(page, limit, category);
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

