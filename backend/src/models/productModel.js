const { getDB } = require('../db');

module.exports = {
    // Obtener todos los productos desde SQLite
    getAll: async () => {
        const db = getDB();

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
        const db = getDB();
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
        const db = getDB();
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
                        // this.changes === 0 → no existe el producto
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
    // ...


    remove: async (id) => {
        const db = getDB();

        return new Promise((resolve, reject) => {
            db.run(
                `DELETE FROM products WHERE id = ?`,
                [id],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        if (this.changes === 0) {
                            // No se encontró el producto
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
