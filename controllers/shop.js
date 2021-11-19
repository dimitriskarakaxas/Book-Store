const Book = require("../models/book");

exports.getIndex = (req, res, next) => {
  Book.find({})
    .then((books) => {
      console.log(books);
      res.render("shop/index", {
        pageTitle: "Book Store",
        path: "/",
        books: books,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Shopping Cart",
    path: "/cart",
  });
};
