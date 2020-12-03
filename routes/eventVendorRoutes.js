
const mongoose = require("mongoose");
const EventsVendor = mongoose.model("eventsVendor");

module.exports = (app) => {
  
  //generic get all events route (caution - big)
  app.get("/api/eventsVendor/", async (req, res) => {
 
    const allEventVendors = await EventsVendor.find();
    res.send(allEventVendors);
  });

  //create new event
  app.post("/api/eventsVendor/", async (req, res) => {
    const {eventName,vendorName } = req.body;
    const newEventVendor = await EventsVendor.create({
      eventName,
      vendorName
    });

    const allEventVendors = await EventsVendor.find();
    res.send(allEventVendors);
  });

  app.put("/api/eventsVendor/:eventVendorId", async (req, res) => {
    const { eventVendorId } = req.params;
    const { eventName,vendorName } = req.body;

    await Events.update({ _id: eventVendorId }, {
      eventName,
      vendorName
    });

    const allEventVendors = await EventsVendor.find();
    res.send(allEventVendors);
  });

  app.delete("/api/eventsVendor/:eventVendorId", async (req, res) => {
    const { eventVendorId } = req.params;

    await EventsVendor.remove({ _id: eventVendorId });

    const allEventVendors = await EventsVendor.find();
    res.send(allEventVendors);
  });

};

