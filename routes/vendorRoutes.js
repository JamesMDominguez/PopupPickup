
const mongoose = require("mongoose");
const Vendors = mongoose.model("vendors")

module.exports = (app) => {
  //geit dat product 4 a vendor
  app.get("/api/vendors/:vendorId", async (req, res) => {
    const { vendorId } = req.params;
 
    const allVendors = await Vendors.find();
    res.send(allVendors);
  });

  app.post("/api/vendors/:vendorId", async (req, res) => {
    const { vendorId } = req.params;
    const { name} = req.body;
    console.log(req.body)
    const newVendor = await Vendors.create({
      name
    });

    const allVendors = await Vendors.find();
    res.send(allVendors);
  });
}
