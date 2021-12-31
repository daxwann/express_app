const Product = require('../models/product');

exports.renderAddProductPage = (req, res, next) => {
  res.render('admin/edit_product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    edit: false
  });
}

exports.renderEditProductPage = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  res.render('admin/edit_product', {
    product: product,
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    edit: true
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