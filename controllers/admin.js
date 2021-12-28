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
  const product = new Product(req.body.title);
  await product.save();
  res.redirect('/');
}
