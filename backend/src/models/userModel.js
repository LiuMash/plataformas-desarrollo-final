const { db } = require('../db'); 

const createUser = (email, passwordHash, role) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)';
        db.run(query, [email, passwordHash, role], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, email, role });
            }
        });
    });
};

const findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.get(query, [email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

module.exports = { createUser, findByEmail };