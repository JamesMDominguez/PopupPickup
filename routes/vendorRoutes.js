
const mongoose = require("mongoose");
const Products = mongoose.model("products")

module.exports = (app) => {
  //geit dat product 4 a vendor
  app.get("/api/vendors/:vendorId", async (req, res) => {
    const { vendorId } = req.params;
 
    const allProducts = await Products.find();
    res.send(allProducts);
  });

  app.post("/api/vendors/:vendorId", async (req, res) => {
    const { vendorId } = req.params;
    const { name, price, quantity} = req.body;
    console.log(req.body)
    const newProduct = await Products.create({
      name, price, quantity
    });

    const allProducts = await Products.find();
    res.send(allProducts);
  });
}
