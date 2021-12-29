const Product = require('../models/product');

exports.renderAddProductPage = (req, res, next) => {
  res.render('admin/add_product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
}

exports.addProduct = async (req, res, next) => {
  const product = new Product(req.body);
  await product.save();
  res.redirect('/');
}

exports.getProducts = async (_req, res, _next) => {
  const products = await Product.fetchAll();
  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products',
  });
}