const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const authRouter = require("./routes/auth.routes");
const productRouter = require("./routes/product.routes")
const orderRouter = require("./routes/order.routes")

const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)

connectDB();

module.exports = app;
