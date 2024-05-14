import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(products);
      } else return [];
    } catch (err) {
      console.log(err);
    }
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();
      const newproduct = {
        ...product,
        id: uuidv4(),
        status: true,
      };
      products.push(newproduct);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return newproduct;
    } catch (err) {
      console.log(err);
    }
  }

  async updateProduct(id, newValue) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        Object.assign(products[productIndex], newValue);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return "Producto actualizado correctamente";
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        products.splice(productIndex, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return "Producto eliminado correctamente";
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((prod) => prod.id === id);
      if (!product) {
        return null;
      } else return product;
    } catch (err) {
      console.log(err);
    }
  }
}
