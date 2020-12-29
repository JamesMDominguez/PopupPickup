
const mongoose = require("mongoose");
const ReportKey = mongoose.model("reportKey");

module.exports = (app) => {
  //generic get all reportKeys route (caution - big)
  app.get("/api/reportKey/", async (req, res) => {

    const allReportKeys = await ReportKey.find();
    res.send(allReportKeys);
  });

  app.post("/api/reportKey/", async (req, res) => {
    const {market,vendor,date_created } = req.body;
    await ReportKey.create({
        market,vendor,date_created 
    });

    const allReportKeys = await ReportKey.find();
    res.send(allReportKeys);
  });

  app.put("/api/reportKey/:reportKeyId", async (req, res) => {
    const { reportKeyId } = req.params;
    const {market,vendor,date_created } = req.body;

    await ReportKey.update({ _id: reportKeyId }, {
        market,vendor,date_created  
    });

    const allReportKeys = await ReportKey.find();
    res.send(allReportKeys);
  });

  app.delete("/api/reportKey/:reportKeyId", async (req, res) => {
    const { reportKeyId } = req.params;

    await ReportKey.remove({ _id: reportKeyId });

    const allReportKeys = await ReportKey.find();
    res.send(allReportKeys);
  });
};