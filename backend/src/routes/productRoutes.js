const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const requireAuth = require('../middlewares/requireAuth');
const requireAdmin = require('../middlewares/requireAdmin');

// GET /products (público)
router.get('/', productController.getAll);

// POST /products (solo usuarios autenticados y admin)
router.post('/', requireAuth, requireAdmin, productController.create);

// PUT /products/:id (solo usuarios autenticados y admin)
router.put('/:id', requireAuth, requireAdmin, productController.update);

// DELETE /products/:id (solo usuarios autenticados y admin)
router.delete('/:id', requireAuth, requireAdmin, productController.remove);

module.exports = router;
