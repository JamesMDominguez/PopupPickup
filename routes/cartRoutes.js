
const mongoose = require("mongoose");
const Cart = mongoose.model("cart");

module.exports = (app) => {
  //generic get all carts route (caution - big)
  app.get("/api/cart/", async (req, res) => {

    const allCarts = await Cart.find();
    res.send(allCarts);
  });

  app.post("/api/cart/", async (req, res) => {
    const { cartName, cartPrice, cartUser,status } = req.body;
    await Cart.create({
        cartName, cartPrice, cartUser, status
    });

    const allCarts = await Cart.find();
    res.send(allCarts);
  });

  app.put("/api/cart/:cartId", async (req, res) => {
    const { cartId } = req.params;
    const {cartName, cartPrice, cartUser, status } = req.body;

    await Cart.update({ _id: cartId }, {
        cartName, cartPrice, cartUser, status
    });

    const allCarts = await Cart.find();
    res.send(allCarts);
  });

  app.delete("/api/cart/:cartId", async (req, res) => {
    const { cartId } = req.params;

    await Cart.remove({ _id: cartId });

    const allCarts = await Cart.find();
    res.send(allCarts);
  });
};