const { Router } = require('express');
const { productController } = require('../controllers');
const validateNewProduct = require('../middlewares/validateNewProduct');

const router = Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.post('/', validateNewProduct, productController.createProduct);

module.exports = router;
