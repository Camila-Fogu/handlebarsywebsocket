import { Router } from "express";
const router = Router();
import CartsManager from "../manager/CartsManager.js";
const cartsManager = new CartsManager("../src/db/carts.json");

//Endpoints
router.get("/", async (req, res) => {
  try {
    const carts = await cartsManager.getCarts();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = await cartsManager.addCart();
    res.status(200).json(newCart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const id = req.params.cid;
    const cart = await cartsManager.getCartById(id);
    if (!cart) {
      res.status(404).json({ msg: "Carrito no encontrado" });
    } else res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartsManager.addProductInCart(cid, pid);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
