const jwt = require('jsonwebtoken');
const config = require('../config.json');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    jwt.verify(token.split(' ')[1], config.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Could not decode the token.' });
        }
        req.username = decoded.username;
        req.userRole = decoded.role;
        next();
    });
};

module.exports = authMiddleware;
