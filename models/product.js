const fs = require("fs").promises;
const { v4: uuid } = require("uuid");
const path = require("path");
const rootPath = require("../util/path");

module.exports = class Product {
  constructor(newProduct) {
    this.title = newProduct.title;
    this.imageUrl = newProduct.imageUrl;
    this.description = newProduct.description;
    this.price = newProduct.price;
  }

  async save() {
    this.id = uuid();
    const products = await getProductsFromFile();
    products.push(this);
    const p = path.join(rootPath, "data", "products.json");
    fs.writeFile(p, JSON.stringify(products), (writeErr) => {
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

    return products.find((p) => p.id === id);
  }
};

async function getProductsFromFile() {
  let products = [];
  const p = path.join(rootPath, "data", "products.json");

  try {
    const fileContent = await fs.readFile(p);
    products = JSON.parse(fileContent);
  } catch (readErr) {
    console.log(readErr);
  }

  return products;
}
