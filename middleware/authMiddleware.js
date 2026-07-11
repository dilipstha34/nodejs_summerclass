// Authentication middleware to verify JWT token and protect routes

const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
     // Check if token is present in the request header
    if (!token) {
        return res.status(401).json({
            error: "No token supplied. Authorization denied."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        console.error(error);
        res.status(401).json({error: "Token Signature is incalid"});
    }
}