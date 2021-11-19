const express = require("express");
const mongoose = require("mongoose");

const { mongoDBConnectionString, port } = require("./util/config");

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");

const User = require("./models/user");

const app = express();

// Setting up EJS templating engine and the views folder
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static("public"));

app.use((req, res, next) => {
  User.findOne({})
    .then((user) => {
      req.user = user;
      //   console.log(user);
      next();
    })
    .catch((err) => console.log(err));
});

app.use(shopRoutes);
app.use("/admin", adminRoutes);

mongoose
  .connect(mongoDBConnectionString)
  .then((connectionResult) => {
    User.findOne({})
      .then((user) => {
        if (!user) {
          return User.create({
            username: "Saddam",
            password: "123123",
            cart: {},
          });
        }
        return Promise.resolve("Success");
      })
      .then((result) => {
        app.listen(port, () => {
          console.log(`The app is running at http://localhost:${port}`);
        });
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
