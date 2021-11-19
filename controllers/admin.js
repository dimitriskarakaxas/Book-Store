const Book = require("../models/book");

exports.getBooks = (req, res, next) => {
  Book.find({})
    .then((books) => {
      res.render("admin/books", {
        pageTitle: "Admin Books",
        path: "/admin/books",
        books: books,
      });
    })
    .catch((err) => console.log(err));
};
