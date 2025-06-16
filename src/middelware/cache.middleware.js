const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 60 });

function cacheProducts(req, res, next) {
    const key = `products:${req.query.page}_${req.query.category}`;

    const cached = cache.get(key);
    if (cached) {
        return res.json(cached);
    }

    res.sendResponse = res.json;
    res.json = (body) => {
        cache.set(key, body);
        res.sendResponse(body);
    };

    next();
}

module.exports = cacheProducts;
