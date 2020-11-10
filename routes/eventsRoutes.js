
const mongoose = require("mongoose");
const Event = mongoose.model("events");

module.exports = (app) => {
  
  //generic get all events route (caution - big)
  app.get("/api/events", async (req, res) => {
    const allEvents = await Event.find();

    res.send(allEvents);
  });

  //create new event
  app.post("/api/events", async (req, res) => {
    const { note, name, type } = req.body;

    const newEvent = await Event.create({
      type,
      name,
      note,
    });

    const allEvents = await Event.find();
    res.send(allEvents);
  });

  //allow edit of note or highlight by admin
  app.put("/api/events/:_id", async (req, res) => {
    const { _id } = req.params;
    const { note, name, initials, highlighted, type } = req.body;

    const event = await Event.findOneAndUpdate(
      { _id },
      { note, highlighted, name, initials, type }
    );

    const allEvents = await Event.find();
    res.send(allEvents);
  });

  //generic delete route
  app.delete("/api/events/:_id", async (req, res) => {
    const { _id } = req.params;
    const event = await Event.findByIdAndRemove({ _id });

    const allEvents = await Event.find();
    res.send(allEvents);
  });
};

