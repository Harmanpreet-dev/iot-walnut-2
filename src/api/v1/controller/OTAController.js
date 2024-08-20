const { pgClient } = require("../db/connection");
const createIoTJob = require("../AWS/CreateJob");

const createOTAUpdate = async (req, res) => {
  try {
    const {
      name,
      fleetId,
      fleet,
      devices,
      description,
      json,
      isOpen,
      rate,
      maxPerMinute,
      baseRatePerMinute,
      incrementFactor,
      maxPerMinute2,
    } = req.body;
    if (!fleetId || !devices?.length) {
      return res.status(400).send("Please select Fleet and Devices!");
    }
    if (!name?.trim() || !description?.trim() || !json?.trim()) {
      return res
        .status(400)
        .send("Job Name, Description and JSON are required!");
    }
    let result = await pgClient.query(
      `INSERT INTO ota_update 
      (name, fleetId, fleet, devices, description, json, isOpen, created_at, rate, maxPerMinute, baseRatePerMinute, incrementFactor, maxPerMinute2,status) 
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14)  RETURNING id`,
      [
        name,
        fleetId,
        JSON.stringify(fleet),
        JSON.stringify(devices),
        description,
        json,
        isOpen,
        new Date(),
        rate,
        maxPerMinute,
        baseRatePerMinute,
        incrementFactor,
        maxPerMinute2,
        true,
      ]
    );
    const arn = [];

    let insertedId = result.rows[0].id;

    devices.map((x) => {
      arn.push(x.arn);
    });

    createIoTJob(name, arn, json, description, insertedId, pgClient, "OTA");

    return res.status(200).json(true);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOTAUpdates = async (req, res) => {
  try {
    const { rows } = await pgClient.query("SELECT * FROM ota_update");
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getOTAUpdateDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pgClient.query(
      "SELECT * FROM ota_update WHERE id=$1",
      [id]
    );
    return res.status(200).json(rows[0]);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const textJob = async (req, res) => {
  try {
    res.status(200).json("result.rows");
    aqsdxfegbhnjkmnjik;
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createOTAUpdate,
  getOTAUpdates,
  getOTAUpdateDetails,
  textJob,
};
