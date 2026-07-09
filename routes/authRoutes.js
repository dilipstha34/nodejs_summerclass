const express = require('express');
const User = require('../model/user');
const { hashpass, comparePass } = require('../util/password');
const jwt = require('jsonwebtoken');

const router = express.Router();

// register a new user
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const hashedPassword = await hashpass(password);

        const newuser = new User({
            name, email, password: hashedPassword
        });

        const saved = await newuser.save();
        res.status(201).json(saved);
    } catch(error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// login existing user
router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json( {error: "All fields are required" });
        }
        const user = await User.findOne({email});
        if (!user) return res.status(400).json("User not found");
        const passMatch = await comparePass(password, user.password);

        if (!passMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        // Success - User is authenticated
        res.status(200).json({ 
            message: "Login successful", 
            username: user.username,
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({error: error.message});
    }
});

module.exports = router;