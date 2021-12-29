const Product = require('../models/product');

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