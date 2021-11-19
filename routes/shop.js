const express = require("express");

const shopControllers = require("../controllers/shop");

const router = express.Router();

// GET -> Home Page => /
router.get("/", shopControllers.getIndex);

// GET -> Cart Page => /cart
router.get("/cart", shopControllers.getCart);

module.exports = router;
