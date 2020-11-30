
const mongoose = require("mongoose");
const Vendors = mongoose.model("vendors")

module.exports = (app) => {
  //geit dat product 4 a vendor
  app.get("/api/vendors/", async (req, res) => {

    const allVendors = await Vendors.find();
    res.send(allVendors);
  });

  app.post("/api/vendors/", async (req, res) => {
    const { name } = req.body;
    await Vendors.create({
      name
    });

    const allVendors = await Vendors.find();
    res.send(allVendors);
  });

  app.put("/api/vendors/:vendorId", async (req, res) => {
    const { vendorId } = req.params;
    const { name } = req.body;

    await Vendors.update({ _id: vendorId }, {
      name
    });

    const allVendors = await Vendors.find();
    res.send(allVendors);
  });

  app.delete("/api/vendors/:vendorId", async (req, res) => {
    const { vendorId } = req.params;

    await Vendors.remove({ _id: vendorId });

    const allVendors = await Vendors.find();
    res.send(allVendors);
  });
}
