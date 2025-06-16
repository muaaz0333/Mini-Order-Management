const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const authRouter = require("./routes/auth.routes");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);

connectDB();

module.exports = app;
