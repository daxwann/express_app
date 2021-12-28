const fs = require("fs").promises;
const path = require("path");
const rootPath = require("../util/path");

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  async save() {
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
