require("dotenv").config();
const express = require("express");
const MongoDb = require("./mongoDbManager");
const cors = require("cors");
const PORT = process.env.PORT | 3000;
const App = express();
App.use(express.json());
App.use(cors());

App.get("/appointments", async (req, res) => {
  try {
    const list = await MongoDb.getAppointment();
    res.json(list);
  } catch (ex) {
    res.status(500).json({
      message: ex.message,
    });
  }
});

App.put("/addAppointment", async (req, res) => {
  try {
    const result = await MongoDb.addAppointment(req.body);
    let response = { ...req.body, id: result.insertedId };
    delete response._id;
    res.json(response);
  } catch (ex) {
    res.status(500).json({
      message: ex.message,
    });
  }
});

App.delete("/deleteAppointment", async (req, res) => {
  try {
    const result = await MongoDb.deleteAppointment(req.body);
    result.id = req.body.id;
    res.json(result);
  } catch (ex) {
    res.status(500).json({
      message: ex.message,
    });
  }
});

App.patch("/updateAppointment", async (req, res) => {
  try {
    const result = await MongoDb.updateAppointment(req.body);
    res.json(result);
  } catch (ex) {
    res.status(500).json({
      message: ex.message,
    });
  }
});

App.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
