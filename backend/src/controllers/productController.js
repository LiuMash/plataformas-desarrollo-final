const productModel = require('../models/productModel');

module.exports = {
    // GET /products
    getAll: async (req, res) => {
        try {
            const products = await productModel.getAll();
            res.json(products);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).json({ error: 'Error al obtener productos' });
        }
    },

    // POST /products
    create: async (req, res) => {
        try {
            const newProduct = await productModel.create(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error al crear producto:', error);
            res.status(500).json({ error: 'Error al crear producto' });
        }
    },

    // PUT /products/:id
    update: async (req, res) => {
        const { id } = req.params;
        try {
            const updated = await productModel.update(id, req.body);
            res.json(updated);
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            res.status(500).json({ error: 'Error al actualizar producto' });
        }
    },

    // DELETE /products/:id
    remove: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await productModel.remove(id);
            res.json(deleted);
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            res.status(500).json({ error: 'Error al eliminar producto' });
        }
    }
};
