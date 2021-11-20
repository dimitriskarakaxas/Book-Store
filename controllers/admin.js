const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");

exports.getBooks = (req, res, next) => {
  Book.find({})
    .sort({ _id: -1 })
    .then((books) => {
      res.render("admin/books", {
        pageTitle: "Admin Books",
        path: "/admin/books",
        books: books,
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddBook = (req, res, next) => {
  res.render("admin/add-book", {
    pageTitle: "Add book",
    path: "/admin/add-book",
    editMode: false,
  });
};

exports.postAddBook = (req, res, next) => {
  const book = {
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
  };

  const newBook = new Book(book);
  newBook
    .save()
    .then((result) => {
      res.redirect("/admin/books");
    })
    .catch((err) => console.log(err));
};

exports.getEditBook = (req, res, next) => {
  const bookId = req.params.bookId;

  Book.findById(bookId)
    .then((book) => {
      res.render("admin/add-book", {
        pageTitle: "Add book",
        path: "/admin/books",
        editMode: true,
        book: book,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditBook = (req, res, next) => {
  const bookId = req.body.bookId;

  updatedTitle = req.body.title;
  updatedImage = req.body.image;
  updatedDescription = req.body.description;

  Book.findById(bookId)
    .then((book) => {
      book.title = updatedTitle;
      book.image = updatedImage;
      book.description = updatedDescription;
      return book.save();
    })
    .then((result) => {
      res.redirect("/admin/books");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteBook = (req, res, next) => {
  const bookId = req.body.bookId;

  Book.findByIdAndRemove(bookId)
    .then((result) => {
      res.redirect("/admin/books");
    })
    .catch((err) => console.log(err));
};

exports.getUsers = (req, res, next) => {
  User.find({})
    .select("username")
    .then((users) => {
      res.render("admin/users", {
        pageTitle: "Admin Users",
        path: "/admin/users",
        users: users,
      });
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  const userId = req.query.userId;

  Order.find({ userId: userId })
    .populate("userId")
    .then((orders) => {
      res.render("admin/orders", {
        pageTitle: "Admin Orders",
        path: "/admin/users",
        orders: orders,
        userId: orders[0].userId._id,
        username: orders[0].userId.username,
      });
    })
    .catch((err) => {
      res.redirect("/admin/users");
    });
};

exports.postDeleteOrder = (req, res, next) => {
  const orderId = req.body.orderId;
  const userId = req.body.userId;

  Order.findByIdAndRemove(orderId)
    .then((order) => {
      Order.find({ userId: userId }).count((err, count) => {
        if (err || count <= 0) {
          return res.redirect("/admin/users");
        }
        res.redirect(`/admin/orders?userId=${userId}`);
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteUser = (req, res, next) => {};
