const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
    
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