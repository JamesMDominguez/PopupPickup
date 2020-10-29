
const mongoose = require("mongoose");
const Vendor = mongoose.model("vendors");

module.exports = (app) => {
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