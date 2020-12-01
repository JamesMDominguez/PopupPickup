const mongoose = require("mongoose");
const Users = mongoose.model("users")

module.exports = (app) => {
  //geit dat product 4 a user
  app.get("/api/users/", async (req, res) => {

    const allUsers = await Users.find();
    res.send(allUsers);
  });

  app.post("/api/users/", async (req, res) => {
    const { username, userType } = req.body;
    await Users.create({
      username, userType
    });

    const allUsers = await Users.find();
    res.send(allUsers);
  });
}
