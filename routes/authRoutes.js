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


module.exports = router;