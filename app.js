const express = require("express");
const mongoose = require("mongoose");

const { mongoDBConnectionString, port } = require("./util/config");

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");

const app = express();
// Setting up Application's PORT
const PORT = 8080;

// Setting up EJS templating engine and the views folder
app.set("view engine", "ejs");
app.set("views", "views");

// Serve static files from public folder
app.use(express.static("public"));

app.use(shopRoutes);
app.use("/admin", adminRoutes);

mongoose
  .connect(mongoDBConnectionString)
  .then((connectionResult) => {
    app.listen(port, () => {
      console.log(`The app is running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
