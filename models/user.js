const mongoose = require("mongoose");
const { Schema } = mongoose;

const Order = require("./order");

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

user.methods.addToCart = function (prodId, doDecrease) {
  let cartProductIndex = -1;
  let updatedCartItems = [];

  if (this.cart.items) {
    cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === prodId.toString();
    });
    updatedCartItems = [...this.cart.items];
  }

  let newQuantity = 1;
  if (cartProductIndex >= 0) {
    let newQuantity;
    if (doDecrease) {
      newQuantity = this.cart.items[cartProductIndex].quantity - 1;
      if (newQuantity <= 0) {
        return this.removeFromCart(prodId);
      }
    } else {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    }
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: prodId,
      quantity: newQuantity,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart;
  return this.save();
};

user.methods.removeFromCart = function (prodId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== prodId.toString();
  });

  this.cart.items = updatedCartItems;

  return this.save();
};

user.methods.clearCart = function () {
  this.cart.items = [];
  return this.save();
};

user.methods.haveOrderRight = function (cb) {
  let ordersQuantity = 0;
  Order.find({ userId: this._id })
    .then((userOrders) => {
      userOrders.forEach((order) => {
        const orderQuantity = order.items.reduce((acc, cur) => {
          return acc + cur.quantity;
        }, 0);
        ordersQuantity += orderQuantity;
      });

      const cartQuantity = this.cart.items.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0);

      cb(ordersQuantity + cartQuantity <= 2 ? true : false);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoose.model("User", user);
