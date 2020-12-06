
const mongoose = require("mongoose");
const Products = mongoose.model("products")

module.exports = (app) => {
  //geit dat product 4 a vendor
  app.get("/api/products/", async (req, res) => {

    const allProducts = await Products.find();
    res.send(allProducts);
  });

  app.post("/api/products/", async (req, res) => {
    const { vendor, name, price, quantity, url } = req.body;
    await Products.create({
      vendor, name, price, quantity, url
    });

    const allProducts = await Products.find();
    res.send(allProducts);
  });

  app.put("/api/products/:productId", async (req, res) => {
    const { productId } = req.params;
    const { vendor, name, price, quantity, url } = req.body;

    await Products.update({ _id: productId }, {
      vendor, name, price, quantity, url
    });

    const allProducts = await Products.find();
    res.send(allProducts);
  });

  app.delete("/api/products/:productId", async (req, res) => {
    const { productId } = req.params;

    await Products.remove({ _id: productId });

    const allProducts = await Products.find();
    res.send(allProducts);
  });
}
