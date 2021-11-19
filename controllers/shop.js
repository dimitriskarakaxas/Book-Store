const Book = require("../models/book");
const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  Book.find({})
    .then((books) => {
      res.render("shop/index", {
        pageTitle: "Book Store",
        path: "/",
        books: books,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  User.findById(req.user)
    .select("cart")
    .populate("cart.items.productId")
    .then((userCart) => {
      res.render("shop/cart", {
        pageTitle: "Shopping Cart",
        path: "/cart",
        cartItems: userCart.cart.items,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const bookId = req.body.bookId;

  console.log(req.user);

  Book.findById(bookId)
    .then((book) => {
      return req.user.addToCart(book);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
