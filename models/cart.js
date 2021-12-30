const fs = require("fs").promises;
const path = require("path");
const rootPath = require("../util/path");
const Product = require('./product');
const _ = require('lodash');

const cartPath = path.join(rootPath, 'data', 'cart.json');

module.exports = class Cart {
  static async addProduct(prodId) {
    const product = await Product.findById(prodId);
    const cart = await getCartFromFile();

    if (!product) {
      throw Error(writeErr);
    }

    if (cart.products[prodId]) {
      cart.products[prodId] = cart.products[prodId] + 1;
    } else {
      cart.products[prodId] = 1;
    }

    cart.totalPrice += product.price;

    try {
      await fs.writeFile(cartPath, JSON.stringify(cart));
    } catch(writeErr) {
      throw Error(writeErr);
    }
  } 
}

async function getCartFromFile() {
  let cart = { products: {}, totalPrice: 0 };

  try {
    const fileContent = await fs.readFile(cartPath);
    cart = JSON.parse(fileContent);
  } catch (readErr) {
    console.log(readErr);
  }

  return cart;
}