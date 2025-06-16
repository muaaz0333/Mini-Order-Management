const express = require("express");

const router = express.Router();

const productController = require("../controllers/product.controller");

const auth = require("../middelware/auth.middelware");

const { productRateLimiter } = require("../middelware/rateLimit.middleware");

const cacheProducts = require("../middelware/cache.middleware");

router.post("/", auth, productController.create);
router.put("/:id", auth, productController.update);
router.delete("/:id", auth, productController.delete);
router.get("/",auth,  productRateLimiter, cacheProducts, productController.list);

module.exports = router;
