const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAllProducts = async (_req, res, _next) => {
  const products = await Product.fetchAll();
  res.render('shop/product_listing', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products',
  });
}

exports.getIndex = async (_req, res, _next) => {
  const products = await Product.fetchAll();
  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
  });
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart'
  })
}

exports.addToCart = async (req, res, next) => {
  const productId = req.body.productId;
  try {
    await Cart.addProduct(productId);
    res.redirect('/cart');
  } catch(err) {
    console.error(err);
  }
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders'
  })
}

exports.getProductDetail = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);

  res.render('shop/product_detail', {
    pageTitle: product.title,
    path: '/products',
    product
  })
}