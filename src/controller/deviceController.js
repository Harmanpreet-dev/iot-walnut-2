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

      await CreateThingAndAddToGroup(name_uniqe, fleet, imei, pgClient);

      // console.log("start");
      // console.log(certificate_id);
      // console.log("end");

      // await pgClient.query(
      //   "INSERT INTO devices (imei,fleet,name,certificate_id) VALUES ($1,$2,$3,$4)",
      //   [imei, fleet, name_uniqe, certificate_id]
      // );
    }

    if (duplicates.length > 0) {
      return res.status(400).json({ error: "Duplicate imei_no", duplicates });
    }

    res.status(200).json({ message: "IMEIs uploaded successfully" });
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

const addDevice = async (req, res) => {
  try {
    const { imei, fleet, name } = req.body;

    let result = await pgClient.query(
      "INSERT INTO devices (imei,fleet,name) VALUES ($1,$2,$3)",
      [imei, fleet, name]
    );

    await CreateThingAndAddToGroup(name, fleet);

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
    stopDeviceConnectivity(
      "cffcc0bdec97e7e1349f228710f71daa68ecfea15cfea9b02db8a04783413801"
    );
    res.status(200).json({ status: true });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addDevice,
  getDevices,
  getDevice,
  revokeDevice,
  addImei,
};
