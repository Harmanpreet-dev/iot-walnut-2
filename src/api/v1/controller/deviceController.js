const CreateThingAndAddToGroup = require("../AWS/CreateThingAndAddToFleet");
const stopDeviceConnectivity = require("../AWS/stopDeviceConnectivity");
const { pgClient } = require("../db/connection");

const xlsx = require("xlsx");

const addImei = async (req, res) => {
  try {
    const file = req.file;
    let { fleet } = req.body;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    const imeis = data.map((row) => row.imei_no);
    const existingImeis = await getExistingImeis();

    const duplicates = imeis.filter((imei) => existingImeis.includes(imei));
    const uniqueImeis = imeis.filter((imei) => !existingImeis.includes(imei));

    for (let imei of uniqueImeis) {
      let name_uniqe = `${fleet}_${imei}_sp_${Math.floor(Math.random() * 10)}`;

      await pgClient.query(
        "INSERT INTO devices(imei,fleet,name,certificate_id,status) VALUES ($1,$2,$3,$4,$5)",
        [imei, fleet, name_uniqe, "certificate_id", true]
      );

      await CreateThingAndAddToGroup(name_uniqe, fleet, imei, pgClient);
    }

    if (duplicates.length > 0) {
      return res.status(400).json({ error: "Duplicate imei_no", duplicates });
    }

    res.status(200).json("Whitelist uploaded successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addBlackImei = async (req, res) => {
  try {
    const file = req.file;
    let { fleet } = req.body;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    const imeis = data.map((row) => row.imei_no);
    const existingImeis = await getExistingImeisBlack();

    const duplicates = imeis.filter((imei) => existingImeis.includes(imei));
    const uniqueImeis = imeis.filter((imei) => !existingImeis.includes(imei));

    for (let imei of uniqueImeis) {
      await pgClient.query("INSERT INTO blacklist (imei) VALUES ($1)", [imei]);

      let data = await pgClient.query(
        "SELECT certificate_id FROM devices WHERE imei=$1",
        [imei]
      );

      await pgClient.query("UPDATE devices SET status=$1 WHERE imei=$2", [
        "false",
        imei,
      ]);

      await stopDeviceConnectivity(data.rows[0].certificate_id);
    }

    if (duplicates.length > 0) {
      return res.status(400).json({ error: "Duplicate imei_no", duplicates });
    }

    res.status(200).json("Blacklist uploaded successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getExistingImeis = async () => {
  try {
    const result = await pgClient.query("SELECT imei FROM devices");
    return result.rows.map((row) => row.imei);
  } catch (err) {
    console.error("Error fetching existing IMEIs:", err);
    return [];
  }
};

const getExistingImeisBlack = async () => {
  try {
    const result = await pgClient.query("SELECT imei FROM blacklist");
    return result.rows.map((row) => row.imei);
  } catch (err) {
    console.error("Error fetching existing IMEIs:", err);
    return [];
  }
};

const addDevice = async (req, res) => {
  try {
    const { imei, fleet, name } = req.body;

    let result = await pgClient.query(
      "INSERT INTO devices (imei,fleet,name) VALUES ($1,$2,$3)",
      [imei, fleet, name]
    );

    await CreateThingAndAddToGroup(name, fleet);

    res.json("Whitelist was Added");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getDevicesAll = async (req, res) => {
  try {
    let result = await pgClient.query("SELECT * FROM devices");

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getDevices = async (req, res) => {
  try {
    let result = await pgClient.query("SELECT * FROM devices WHERE fleet=$1", [
      req.body.fleet,
    ]);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getDevice = async (req, res) => {
  try {
    let result = await pgClient.query("SELECT * FROM devices WHERE name=$1", [
      req.body.name,
    ]);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const revokeDevice = async (req, res) => {
  try {
    let result = await stopDeviceConnectivity(req.body.certificate_id);
    await pgClient.query(
      "UPDATE devices SET status=$1 WHERE certificate_id=$2",
      ["false", req.body.certificate_id]
    );
    res.status(200).json({ status: result });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addDevice,
  getDevicesAll,
  getDevices,
  getDevice,
  revokeDevice,
  addImei,
  addBlackImei,
};
