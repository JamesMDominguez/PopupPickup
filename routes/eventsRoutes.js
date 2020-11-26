
const mongoose = require("mongoose");
const Events = mongoose.model("events");

module.exports = (app) => {
  
  //generic get all events route (caution - big)
  app.get("/api/events/", async (req, res) => {
 
    const allEvents = await Events.find();
    res.send(allEvents);
  });

  //create new event
  app.post("/api/events/:eventId", async (req, res) => {
    const {eventName,city,longitude,latitude } = req.body;
    const newEvent = await Events.create({
      eventName,
      city,
      longitude,
      latitude
    });

    const allEvents = await Events.find();
    res.send(allEvents);
  });

};

