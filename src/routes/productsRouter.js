/*import { Router } from "express";
const router = Router();
import ProductManager from "../manager/ProductManager.js";
const productManager = new ProductManager("../src/db/products.json");
import { productValidator } from "../middlewares/productValidator.js";
import { uploader } from "../middlewares/multer.js";
//Endpoints
router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    if (!limit) {
      res.status(200).json(products);
    } else {
      const productsList = products.slice(0, limit);
      res.status(200).json(productsList);
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await productManager.getProductById(id);
    if (!product) {
      res.status(404).json({ msg: "Producto no encontrado" });
    } else res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/", productValidator, async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productManager.addProduct(product);
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/profile", uploader.array("image"), async (req, res) => {
  try {
    console.log(req.files);
    const product = req.body;
    product.image = req.files.path;
    const newProduct = await productManager.addProduct(product);
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await productManager.updateProduct(id, req.body);
    if (!product) res.status(404).json({ msg: "Error updating product" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await productManager.deleteProduct(id);
    if (!product) res.status(404).json({ msg: "Error delete product" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;*/
