const User = require("../models/user");

const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use." });
        }
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    try {
        const user = await User
            .findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password." });
        }
        res.json({ message: "Login successful.", username:user.email });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error." });
    }

}

module.exports = { register, login };