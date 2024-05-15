import { Router } from "express";
const router = Router();
import { __dirname } from "../utils.js";
import ProductManager from "../manager/ProductManager.js";
const productManager = new ProductManager(__dirname + "/db/products.json");
import { productValidator } from "../middlewares/productValidator.js";
import { uploader } from "../middlewares/multer.js";

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products: products });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realTimeProducts");
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
