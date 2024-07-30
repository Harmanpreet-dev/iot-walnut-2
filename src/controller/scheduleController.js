const createIoTJob = require("../AWS/CreateJob");
const StopAWSJob = require("../AWS/StopAWSJob");
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
      (name, fleetId, fleet, devices, description, json, isOpen, date, time, rate, maxPerMinute, baseRatePerMinute, incrementFactor, maxPerMinute2,status) 
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id`,
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
        true,
      ]
    );

    let arn = [];
    let insertedId = result.rows[0].id;

    devices.map((x) => {
      arn.push(x.arn);
    });

    createIoTJob(name, arn, json, description, insertedId, pgClient);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const StopJob = async (req, res) => {
  try {
    if (req.body.type == "SCH") {
      let result = await pgClient.query(
        "UPDATE schedule SET status=$1 WHERE id=$2",
        [false, req.body.id]
      );

      StopAWSJob(req.body.arn);
      res.status(200).json(result.rows);
    } else {
      let result = await pgClient.query(
        "UPDATE ota_update SET status=$1 WHERE id=$2",
        [false, req.body.id]
      );

      StopAWSJob(req.body.arn);
      res.status(200).json(result.rows);
    }
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
    aqsdxfegbhnjkmnjik;
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  AddSchedule,
  getScheduleTask,
  getScheduleTaskDetails,
  textJob,
  StopJob,
};
