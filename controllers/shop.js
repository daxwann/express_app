const Product = require('../models/product');

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render('shop/product_listing', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
}