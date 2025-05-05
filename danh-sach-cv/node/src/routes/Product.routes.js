const express = require('express');
const router = express.Router();
const productController = require('../controllers/Product.controller');

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.delete('/:id', productController.deleteProductById);
router.put('/:id', productController.updateProduct);

module.exports = router;
