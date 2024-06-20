const CreateThingAndAddToGroup = require("../AWS/CreateThingAndAddToFleet");
const { pgClient } = require("../db/connection");

const addDevice = async (req, res) => {
  try {
    const { imei, fleet } = req.body;

    let result = await pgClient.query(
      "INSERT INTO devices (imei,fleet) VALUES ($1,$2)",
      [imei, fleet]
    );

    await CreateThingAndAddToGroup(imei, fleet);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getDevices = async (req, res) => {
  try {
    let result = await pgClient.query("SELECT * FROM devices");

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addDevice,
  getDevices,
};
