
const mongoose = require("mongoose");
const Products = mongoose.model("products")

module.exports = (app) => {
  //geit dat product 4 a vendor
  app.get("/api/products/:productId", async (req, res) => {
    const { productId } = req.params;
 
    const allProducts = await Products.find();
    res.send(allProducts);
  });

  app.post("/api/products/:productId", async (req, res) => {
    const { productId } = req.params;
    const { vendor,name, price, quantity} = req.body;
    console.log(req.body)
    const newProduct = await Products.create({
      vendor, name, price, quantity
    });

    const allProducts = await Products.find();
    res.send(allProducts);
  });
}
