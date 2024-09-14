const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../Services/login.service'); // Adjust the path as needed
const logger = require('../Services/logger.service'); // Import the logger
const config = require('../config.json')

// Middleware to handle errors
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Signup controller
const signup = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    const userExists = await db.getUserByEmail(username);
    if (userExists) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await db.createUser({ username, password: hashedPassword, role: "user" });

    // Create a token
    const token = jwt.sign({ username: newUser.username, role: newUser.role }, config.jwtSecret, { expiresIn: '1h' });

    logger.info(`Signup successful for username: ${username}`);
    res.status(201).json({ token });
});

// Login controller
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await db.getUserByEmail(username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a token
    const token = jwt.sign({ username: user.username, role: user.role }, config.jwtSecret, { expiresIn: '1h' });

    logger.info(`Login successful for username: ${username}`);
    res.status(200).json({ token });
});

module.exports = { signup, login };
