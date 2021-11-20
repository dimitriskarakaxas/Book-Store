const express = require("express");

const shopControllers = require("../controllers/shop");

const router = express.Router();

// GET =>  /
router.get("/", shopControllers.getIndex);

// GET => /cart
router.get("/cart", shopControllers.getCart);

// POST => /cart
router.post("/cart", shopControllers.postCart);

// POST => /delete-cart-item
router.post("/delete-cart-item", shopControllers.postDeleteCartItem);

// GET => /order
router.get("/order", shopControllers.getOrder);

// POST => /order
router.post("/order", shopControllers.postOrder);

module.exports = router;
