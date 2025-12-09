// Este archivo debe crear y exportar la conexión a SQLite.
// Persona 2 va a implementar la conexión real usando sqlite3 o better-sqlite3.

const sqlite3 = require('sqlite3').verbose();
let db = null;

// Crear y abrir la base de datos SQLite y crear tablas si no existen
function initDB() {
    db = new sqlite3.Database('./database.db', (err) => {
        if (err) {
            console.error('Error al conectar con SQLite:', err.message);
        } else {
            console.log('Conexión a SQLite establecida.');
            createTables();
        }
    });
    return db;
}

function createTables() {
    db.serialize(() => {
        // Tabla de usuarios
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'user'
            )
        `);

        // Tabla de productos
        db.run(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                price REAL NOT NULL,
                stock INTEGER NOT NULL DEFAULT 0
            )
        `);

        console.log('Tablas verificadas/creadas.');
    });
}

module.exports = {
    initDB,
    getDB: () => db
};
