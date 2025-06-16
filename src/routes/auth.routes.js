const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const {authLimiter} = require("../middelware/rateLimit.middleware");

router.post('/register', authController.register);
router.post('/login', authLimiter, authController.login);

module.exports = router;
