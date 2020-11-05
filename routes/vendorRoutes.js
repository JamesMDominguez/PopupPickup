
const mongoose = require("mongoose");
const Vendor = mongoose.model("vendors");
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

  //generic get all vendors route (caution - big)
  app.get("/api/vendors", async (req, res) => {
    const allVendors = await Vendor.find();

    res.send(allVendors);
  });

  //create new vendor
  app.post("/api/vendors", async (req, res) => {
    const { note, name, type } = req.body;

    const newVendor = await Vendor.create({
      type,
      name,
      note,
    });

    const allVendors = await Vendor.find();
    res.send(allVendors);
  });

  //allow edit of note or highlight by admin
  app.put("/api/vendors/:_id", async (req, res) => {
    const { _id } = req.params;
    const { note, name, initials, highlighted, type } = req.body;

    const vendor = await Vendor.findOneAndUpdate(
      { _id },
      { note, highlighted, name, initials, type }
    );

    const allVendors = await Vendor.find();
    res.send(allVendors);
  });

  //generic delete route
  app.delete("/api/vendors/:_id", async (req, res) => {
    const { _id } = req.params;
    const vendor = await Vendor.findByIdAndRemove({ _id });

    const allVendors = await Vendor.find();
    res.send(allVendors);
  });
};
