const User = require("../models/User");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

exports.register = async (input) => {
    const hashed = await bcrypt.hash(input.password, 10);
    const existingUser = await User.findOne({email: input.email});
    if (existingUser) {
        throw new Error("User with this email already exists :( 💔")
    }

    const user = new User({
        name: input.name,
        email: input.email,
        role: input.role,
        password: hashed
    });

    await user.save();

    return user;
}

exports.login = async (input) => {
    const user = await User.findOne({ email: input.email });
    if (!user) {
        throw new Error("User not found. :((((😭");
    }

    const isValid = await bcrypt.compare(input.password, user.password);

    if (!isValid) {
        throw new Error("Invalid password. :(((((😁");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn:'1h' });

    return token;
}

