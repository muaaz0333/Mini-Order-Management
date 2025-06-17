const express = require("express");

const router = express.Router();

const orderController = require("../controllers/order.controller");

const auth = require("../middelware/auth.middelware");

const isAdmin = require("../middelware/authorize.middlware");

router.post("/", auth, orderController.create);
router.get("/", auth, orderController.list);
router.patch("/:id", auth, isAdmin, orderController.update);
router.get("/history", auth, orderController.history);

module.exports = router;

