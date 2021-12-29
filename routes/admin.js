const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();

router.get('/add-product', adminController.renderAddProductPage);
router.post('/add-product', adminController.addProduct);
router.post('/edit-product');
router.get('/products', adminController.getProducts);


exports.routes = router;