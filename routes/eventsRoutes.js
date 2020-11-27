
const mongoose = require("mongoose");
const Events = mongoose.model("events");

module.exports = (app) => {
  
  //generic get all events route (caution - big)
  app.get("/api/events/", async (req, res) => {
 
    const allEvents = await Events.find();
    res.send(allEvents);
  });

  //create new event
  app.post("/api/events/", async (req, res) => {
    const {eventName,city,longitude,latitude,requests,vendors } = req.body;
    const newEvent = await Events.create({
      eventName,
      city,
      longitude,
      latitude,
      requests,
      vendors
    });

    const allEvents = await Events.find();
    res.send(allEvents);
  });

  app.put("/api/events/:eventId", async (req, res) => {
    const { eventId } = req.params;
    const { eventName,city,longitude,latitude,requests,vendors } = req.body;

    await Events.update({ _id: eventId }, {
      eventName,
      city,
      longitude,
      latitude,
      requests,
      vendors 
    });

    const allEvents = await Events.find();
    res.send(allEvents);
  });

  app.delete("/api/events/:eventId", async (req, res) => {
    const { eventId } = req.params;

    await Events.remove({ _id: eventId });

    const allEvents = await Events.find();
    res.send(allEvents);
  });

};

