const express = require("express");

const adminControllers = require("../controllers/admin");

const router = express.Router();

// GET => Admin Books Page => /admin/books
router.get("/books", adminControllers.getBooks);

module.exports = router;
