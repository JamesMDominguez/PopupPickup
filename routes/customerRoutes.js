
const mongoose = require("mongoose");
const Customer = mongoose.model("customers");

module.exports = (app) => {
  //generic get all customers route (caution - big)
  app.get("/api/customers", async (req, res) => {
    const allCustomers = await Customer.find();

    res.send(allCustomers);
  });

  //create new customer
  app.post("/api/customers", async (req, res) => {
    const { note, name, type } = req.body;

    const newCustomer = await Customer.create({
      type,
      name,
      note,
    });

    const allCustomers = await Customer.find();
    res.send(allCustomers);
  });

  //allow edit of note or highlight by admin
  app.put("/api/customers/:_id", async (req, res) => {
    const { _id } = req.params;
    const { note, name, initials, highlighted, type } = req.body;

    const customer = await Customer.findOneAndUpdate(
      { _id },
      { note, highlighted, name, initials, type }
    );

    const allCustomers = await Customer.find();
    res.send(allCustomers);
  });

  //generic delete route
  app.delete("/api/customers/:_id", async (req, res) => {
    const { _id } = req.params;
    const customer = await Customer.findByIdAndRemove({ _id });

    const allCustomers = await Customer.find();
    res.send(allCustomers);
  });
};