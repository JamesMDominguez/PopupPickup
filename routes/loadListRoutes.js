
const mongoose = require("mongoose");
const LoadList = mongoose.model("loadList");

module.exports = (app) => {
  //generic get all loadLists route (caution - big)
  app.get("/api/loadList/", async (req, res) => {

    const allLoadLists = await LoadList.find();
    res.send(allLoadLists);
  });

  app.post("/api/loadList/", async (req, res) => {
    const {market,name,price,vendor,quantity,date_created } = req.body;
    await LoadList.create({
      market,name,price,vendor,quantity,date_created
    });

    const allLoadLists = await LoadList.find();
    res.send(allLoadLists);
  });

  app.put("/api/loadList/:loadListId", async (req, res) => {
    const { loadListId } = req.params;
    const {market,name,price,vendor,quantity,date_created } = req.body;

    await LoadList.update({ _id: loadListId }, {
      market,name,price,vendor,quantity,date_created  
    });

    const allLoadLists = await LoadList.find();
    res.send(allLoadLists);
  });

  app.delete("/api/loadList/:loadListId", async (req, res) => {
    const { loadListId } = req.params;

    await LoadList.remove({ _id: loadListId });

    const allLoadLists = await LoadList.find();
    res.send(allLoadLists);
  });
};