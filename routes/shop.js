const express = require("express");

const shopControllers = require("../controllers/shop");

const router = express.Router();

// GET =>  /
router.get("/", shopControllers.getIndex);

// GET => /cart
router.get("/cart", shopControllers.getCart);

// POST => /cart
router.post("/cart", shopControllers.postCart);

module.exports = router;
