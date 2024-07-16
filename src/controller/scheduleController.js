const createIoTJob = require("../AWS/CreateJob");
const { pgClient } = require("../db/connection");

const AddSchedule = async (req, res) => {
  try {
    const {
      name,
      fleetId,
      fleet,
      devices,
      description,
      json,
      isOpen,
      date,
      time,
      rate,
      maxPerMintue,
      baseRatePerMinute,
      incrementFactor,
      maxPerMintue2,
    } = req.body;

    let result = await pgClient.query(
      `INSERT INTO schedule 
      (name, fleetId, fleet, devices, description, json, isOpen, date, time, rate, maxPerMinute, baseRatePerMinute, incrementFactor, maxPerMinute2) 
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        name,
        fleetId,
        JSON.stringify(fleet),
        JSON.stringify(devices),
        description,
        json,
        isOpen,
        date,
        time,
        rate,
        maxPerMintue,
        baseRatePerMinute,
        incrementFactor,
        maxPerMintue2,
      ]
    );

    let arn = [];

    devices.map((x) => {
      arn.push(x.arn);
    });

    createIoTJob(name, arn, json, description);

    res.status(200).json(true);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getScheduleTask = async (req, res) => {
  try {
    let result = await pgClient.query("SELECT * FROM schedule");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getScheduleTaskDetails = async (req, res) => {
  try {
    let result = await pgClient.query("SELECT * FROM schedule WHERE id=$1", [
      req.body.id,
    ]);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const textJob = async (req, res) => {
  try {
    res.status(200).json("result.rows");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  AddSchedule,
  getScheduleTask,
  getScheduleTaskDetails,
  textJob,
};
