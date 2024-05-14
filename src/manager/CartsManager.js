import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class CartsManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(carts);
      } else return [];
    } catch (err) {
      console.log(err);
    }
  }

  async addCart() {
    try {
      const carts = await this.getCarts();
      const newCart = {
        id: uuidv4(),
        products: [],
      };
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return newCart;
    } catch (err) {
      console.log(err);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      const cartById = carts.find((cart) => cart.id === id);
      if (!cartById) {
        return null;
      } else return cartById;
    } catch (err) {
      console.log(err);
    }
  }

  async addProductInCart(cid, pid) {
    try {
      const cartById = await this.getCartById(cid);
      if (!cartById) return "El carrito no existe";
      const productExist = cartById.products.find((prod) => prod.id === pid);
      if (!productExist) {
        const newProduct = {
          id: pid,
          quantity: 1,
        };
        cartById.products.push(newProduct);
      } else {
        productExist.quantity++;
      }
      const carts = await this.getCarts();
      const updatedCarts = carts.map((cart) => {
        if (cart.id === cid) return cartById;
        return cart;
      });
      await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
      return cartById;
    } catch (err) {
      console.log(err);
    }
  }
}
