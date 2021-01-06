
const mongoose = require("mongoose");
const Employees = mongoose.model("employee");

module.exports = (app) => {
  
  //generic get all employees route (caution - big)
  app.get("/api/employee/", async (req, res) => {
 
    const allEmployees = await Employees.find();
    res.send(allEmployees);
  });

  //create new employee
  app.post("/api/employee/", async (req, res) => {
    const {employeeName,vendor } = req.body;
    const newEmployee = await Employees.create({
      employeeName,
      vendor
    });

    const allEmployees = await Employees.find();
    res.send(allEmployees);
  });

  app.put("/api/employee/:employeeId", async (req, res) => {
    const { employeeId } = req.params;
    const { employeeName,vendor } = req.body;

    await Employees.update({ _id: employeeId }, {
      employeeName,
      vendor
    });

    const allEmployees = await Employees.find();
    res.send(allEmployees);
  });

  app.delete("/api/employee/:employeeId", async (req, res) => {
    const { employeeId } = req.params;

    await Employees.remove({ _id: employeeId });

    const allEmployees = await Employees.find();
    res.send(allEmployees);
  });

};

