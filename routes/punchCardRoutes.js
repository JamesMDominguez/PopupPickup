
const mongoose = require("mongoose");
const PunchCards = mongoose.model("punchCards")

module.exports = (app) => {
  //geit dat punchCard 4 a vendor
  app.get("/api/punchCards/", async (req, res) => {

    const allPunchCards = await PunchCards.find();
    res.send(allPunchCards);
  });

  app.post("/api/punchCards/", async (req, res) => {
    const { Clockin,ClockOut,name,vendor } = req.body;
    await PunchCards.create({
        Clockin,ClockOut,name,vendor
    });

    const allPunchCards = await PunchCards.find();
    res.send(allPunchCards);
  });

  app.put("/api/punchCards/:punchCardId", async (req, res) => {
    const { punchCardId } = req.params;
    const { Clockin,ClockOut,name,vendor } = req.body;

    await PunchCards.update({ _id: punchCardId }, {
        Clockin,ClockOut,name,vendor
    });

    const allPunchCards = await PunchCards.find();
    res.send(allPunchCards);
  });

  app.delete("/api/punchCards/:punchCardId", async (req, res) => {
    const { punchCardId } = req.params;

    await PunchCards.remove({ _id: punchCardId });

    const allPunchCards = await PunchCards.find();
    res.send(allPunchCards);
  });
}