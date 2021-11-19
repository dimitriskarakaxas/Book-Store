const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Book",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

user.methods.addToCart = function (product) {
  let cartProductIndex = -1;
  let updatedCartItems = [];

  if (this.cart.items) {
    cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    updatedCartItems = [...this.cart.items];
  }

  let newQuantity = 1;
  if (cartProductIndex >= 0) {
    const newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart;
  return this.save();
};

module.exports = mongoose.model("User", user);