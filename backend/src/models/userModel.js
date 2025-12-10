const db = require('../db');

// Función para crear un nuevo usuario en la base de datos
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

// Función para buscar un usuario por su email (para el login)
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