const mongoose = require("mongoose");
const Users = mongoose.model("users")

module.exports = (app) => {
  //geit dat product 4 a user
  app.get("/api/users/:userId", async (req, res) => {
    const { userId } = req.params;
 
    const allUsers = await Users.find();
    res.send(allUsers);
  });

  app.post("/api/users/:userId", async (req, res) => {
    const { userId } = req.params;
    const { userName, email, userType, imgUrl} = req.body;
    console.log(req.body)
    const newUser = await Users.create({
      userName, email, userType,imgUrl
    });

    const allUsers = await Users.find();
    res.send(allUsers);
  });
}
