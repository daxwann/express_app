const fs = require("fs").promises;
const { v4: uuid } = require("uuid");
const path = require("path");
const rootPath = require("../util/path");

const productPath = path.join(rootPath, "data", "products.json");

module.exports = class Product {
  constructor(newProduct) {
    this.id = newProduct.id || uuid();
    this.title = newProduct.title;
    this.imageUrl = newProduct.imageUrl;
    this.description = newProduct.description;
    this.price = parseInt(newProduct.price);
  }

  async save() {
    const products = await getProductsFromFile();
    products.push(this);
    fs.writeFile(productPath, JSON.stringify(products), (writeErr) => {
      console.log("write err", writeErr);
    });
  }

  static async fetchAll() {
    const products = await getProductsFromFile();
    return products;
  }

  static async findById(id) {
    const products = await getProductsFromFile();

    if (!products) return undefined;

    const product = products.find((p) => p.id === id);

    if (product) {
      return new Product(product);
    }

    return undefined;
  }
};

async function getProductsFromFile() {
  let products = [];

  try {
    const fileContent = await fs.readFile(productPath);
    products = JSON.parse(fileContent);
  } catch (readErr) {
    console.log(readErr);
  }

  return products;
}
