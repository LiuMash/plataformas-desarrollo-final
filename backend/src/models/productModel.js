const { db } = require('../db');

module.exports = {
    // Obtener todos los productos desde SQLite
    getAll: async () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM products', [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },

    // Crear producto
    create: async (data) => {
        const { name, description = null, price, stock = 0 } = data;

        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO products (name, description, price, stock)
                 VALUES (?, ?, ?, ?)`,
                [name, description, price, stock],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            id: this.lastID,
                            name,
                            description,
                            price,
                            stock
                        });
                    }
                }
            );
        });
    },

    // Actualizar producto
    update: async (id, data) => {
        const { name, description = null, price, stock } = data;

        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE products
                 SET name = ?, description = ?, price = ?, stock = ?
                 WHERE id = ?`,
                [name, description, price, stock, id],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        if (this.changes === 0) {
                            resolve(null);
                        } else {
                            resolve({
                                id: Number(id),
                                name,
                                description,
                                price,
                                stock
                            });
                        }
                    }
                }
            );
        });
    },

    // Eliminar producto
    remove: async (id) => {
        return new Promise((resolve, reject) => {
            db.run(
                `DELETE FROM products WHERE id = ?`,
                [id],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        if (this.changes === 0) {
                            resolve(null);
                        } else {
                            resolve({ success: true });
                        }
                    }
                }
            );
        });
    }
};