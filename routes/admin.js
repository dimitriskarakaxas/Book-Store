const express = require("express");

const adminControllers = require("../controllers/admin");

const router = express.Router();

// GET => /admin/books
router.get("/books", adminControllers.getBooks);

// GET => /admin/add-book
router.get("/add-book", adminControllers.getAddBook);

// POST => /admin/add-book
router.post("/add-book", adminControllers.postAddBook);

// GET => /admin/edit-book/:bookId
router.get("/edit-book/:bookId", adminControllers.getEditBook);

// POST => /admin/edit-book
router.post("/edit-book", adminControllers.postEditBook);

// POST => /admin/delete-book
router.post("/delete-book", adminControllers.postDeleteBook);

module.exports = router;
