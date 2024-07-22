require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const MongoDb = require("./mongoDbManager");
const App = express();
const router = express.Router();

router.get("/appointments", async (req, res) => {
  try {
    const list = await MongoDb.getAppointment();
    res.json(list);
  } catch (ex) {
    res.status(500).json({
      message: ex.message,
    });
  }
});

router.put("/addAppointment", async (req, res) => {
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

router.delete("/deleteAppointment", async (req, res) => {
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

router.patch("/updateAppointment", async (req, res) => {
  try {
    const result = await MongoDb.updateAppointment(req.body);
    res.json(result);
  } catch (ex) {
    res.status(500).json({
      message: ex.message,
    });
  }
});

App.use("/.netlify/functions/api", router);
module.exports.handler = serverless(App);
