const authService = require("../services/auth.services");

exports.register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ message: "User registered.", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const token = await authService.login(req.body);
        res.json({ message: "Login successfulllllllll yeahhhhh.🎉🔥", token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
