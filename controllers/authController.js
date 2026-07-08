// controllers/authController.js

// Import bcrypt for password hashing

const bcrypt = require("bcryptjs");

// Import JWT

const jwt = require("jsonwebtoken");

// Import users array

const users = require("../models/users");



// Register a new user

const register = async (req, res) => {

    try {

        // Get email and password from request body

        const { email, password } = req.body;

        // Validate request body

        if (!email || !password) {

            return res.status(400).json({
                error: "Credentials missing"
            });

        }

        // Check if user already exists

        const existingUser = users.find(
            (user) => user.email === email
        );

        if (existingUser) {

            return res.status(400).json({
                error: "User already exists"
            });

        }

        // Hash password

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Create new user

        const newUser = {

            id: users.length + 1,

            email: email,

            password: hashedPassword

        };

        // Save user

        users.push(newUser);

        // Return success response

        res.status(201).json({

            message: "Registration successful",

            userId: newUser.id,

            email: newUser.email

        });

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};



// Login user

const login = async (req, res) => {

    try {

        // Get email and password from request body

        const { email, password } = req.body;

        // Validate request body

        if (!email || !password) {

            return res.status(400).json({

                error: "Credentials missing"

            });

        }

        // Find user

        const user = users.find(

            (user) => user.email === email

        );

        // Check if user exists

        if (!user) {

            return res.status(401).json({

                error: "Invalid credentials"

            });

        }

        // Compare passwords

        const isValid = await bcrypt.compare(

            password,

            user.password

        );

        // Check password

        if (!isValid) {

            return res.status(401).json({

                error: "Invalid credentials"

            });

        }

        // Generate JWT token

        const token = jwt.sign(

            {

                userId: user.id,

                email: user.email

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "1h"

            }

        );

        // Return token

        res.status(200).json({

            message: "Login successful",

            token: token

        });

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};



// Export controller methods

module.exports = {

    register,

    login

};