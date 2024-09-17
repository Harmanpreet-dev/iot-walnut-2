import { pgClient } from "../config/dbConfig.js";
import createIoTJob from "../AWS/CreateJob.js";
import StopAWSJob from "../AWS/StopAWSJob.js";

const addScheduler = async (req, res) => {
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
    if (
      !name?.trim() ||
      !fleetId ||
      !fleet ||
      !devices?.length ||
      !description?.trim()
    ) {
      return res.status(400).json({
        error: "Name, fleet, Fleet Id, devices and Description is required",
      });
    }
    const { rows } = await pgClient.query(
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

    const arn = [];
    const insertedId = rows[0].id;
    devices.map((x) => {
      arn.push(x.arn);
    });
    createIoTJob(name, arn, json, description, insertedId, pgClient);
    return res.status(201).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const getSchedulers = async (req, res) => {
  try {
    const { rows } = await pgClient.query("SELECT * FROM schedule");
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const getScheduler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id?.trim()) {
      return res.status(400).json({
        error: "Id is required",
      });
    }
    const { rows } = await pgClient.query(
      "SELECT * FROM schedule WHERE id=$1",
      [id]
    );
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const stopJob = async (req, res) => {
  try {
    const { id, type, arn } = req.body;
    if (!id?.trim()) {
      return res.status(400).json({
        error: "Id is required",
      });
    }
    if (type == "SCH") {
      const { rows } = await pgClient.query(
        "UPDATE schedule SET status=$1 WHERE id=$2",
        [false, id]
      );
      StopAWSJob(arn);
      return res.status(200).json(rows);
    } else {
      const { rows } = await pgClient.query(
        "UPDATE ota_update SET status=$1 WHERE id=$2",
        [false, id]
      );
      StopAWSJob(arn);
      return res.status(200).json(rows);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};
export { addScheduler, getSchedulers, getScheduler, stopJob };
