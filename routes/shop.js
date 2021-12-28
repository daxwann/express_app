const express = require('express');
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getAllProducts);
router.get('/products');
router.get('/cart');
router.get('/checkout');

module.exports = router;
