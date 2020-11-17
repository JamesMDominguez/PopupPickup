
const mongoose = require("mongoose");
const Events = mongoose.model("events");

module.exports = (app) => {
  
  //generic get all events route (caution - big)
  app.get("/popup-pickup.herokuapp.com/api/events/:eventId", async (req, res) => {
    const {eventId} = req.params;
 
    const allEvents = await Events.find();
    res.send(allEvents);
  });

  //create new event
  app.post("/popup-pickup.herokuapp.com/api/events/:eventId", async (req, res) => {
    const { eventId } = req.params;
    const {eventName,city,coordinates } = req.body;
    console.log(req.body)
    const newEvent = await Events.create({
      eventName,
      city,
      coordinates
    });

    const allEvents = await Events.find();
    res.send(allEvents);
  });

};

