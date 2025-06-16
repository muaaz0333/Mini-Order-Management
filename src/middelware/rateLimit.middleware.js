const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
    windowMs: 30 * 1000,
    max: 5,
    message: "Too many login attempts. Please try again later."
});

const productRateLimiter = rateLimit({
    windowMs: 30 * 1000,
    max: 20,
    message: "Too many requests. Please try again later."
});

module.exports = {
    authLimiter,
    productRateLimiter
};
