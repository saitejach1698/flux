const dbManager = require('../database/dbManager');

module.exports = class User {
    constructor(username, password, role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    static async find(username) {
        const sql = 'SELECT * FROM users WHERE username = ?';
        return await dbManager.query('primary', sql, [username]);
    }

    static async save(user) {
        const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        return await dbManager.query('primary', sql, [user.username, user.password, user.role]);
    }
};

module.exports.deleteUser = async (id) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    const result = await dbManager.query('primary', sql, [id]);
    return result.affectedRows;
};


// Get user by email
module.exports.getUserByEmail = async (email) => {
    const rows = await dbManager.query('primary','SELECT * FROM users WHERE username = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
}

// Create a new user
module.exports.createUser = async (user) => {
    const { username, password, role } = user;
    const result = await dbManager.query('primary','INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role]);
    return { id: result.insertId, ...user };
}
