const orderService = require("../services/order.service");

const productService = require("../services/product.service");

const create = async (req, res) => {
    try {
        // products should be array of { productId, quantity }
        const products = req.body.products;

        if (!products || products.length === 0) {
            return res.status(400).json({ error: "Products are required" });
        }

        let total = 0;

        // Prepare products array for order
        const productsToSave = [];

        for (const item of products) {
            const product = await productService.findProductById(item.productId);
            if (!product) {
                return res.status(404).json({ error: `Product ${item.productId} not found` });
            }
            productsToSave.push({ product: product._id, quantity: item.quantity });
            total += product.price * item.quantity;
        }

        const order = await orderService.create(req.user._id, productsToSave, total);
        res.status(201).json({ order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const list = async (req, res) => {
    try {
        // If you’re an admin, you see all orders; otherwise, just your own
        let filter = {};
        if (req.user.role !== "admin") {
            filter.user = req.user._id;
        }
        const orders = await orderService.findAll(filter);
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Forbidden" });
        }
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: "Status is required" });
        }

        const updated = await orderService.updateStatus(id, status);
        res.json({ updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const history = async (req, res) => {
    try {
        // User can view their own order history
        const orders = await orderService.findUserOrders(req.user._id);
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    create,
    list,
    update,
    history,
};

