const express = require("express");

const router = express.Router();

const productController = require("../controllers/product.controller");

const auth = require("../middelware/auth.middelware");
const isAdmin = require("../middelware/authorize.middlware");

const { productRateLimiter } = require("../middelware/rateLimit.middleware");

const cacheProducts = require("../middelware/cache.middleware");

router.post("/", auth, isAdmin, productController.create);
router.put("/:id", auth, isAdmin, productController.update);
router.delete("/:id", auth, isAdmin, productController.delete);
router.get("/",auth,  productRateLimiter, cacheProducts, productController.list);

module.exports = router;
