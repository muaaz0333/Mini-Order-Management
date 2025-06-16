const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({error: "Not authorized"});
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({error: "Bearer token missing"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({error: "Invalid or expired token"});
    }
}
