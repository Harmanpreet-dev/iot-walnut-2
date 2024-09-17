import xlsx from "xlsx";
import fs from "fs";
import archiver from "archiver";
import path from "path";
import { pgClient } from "./../config/dbConfig.js";
import CreateThingAndAddToGroup from "./../AWS/CreateThingAndAddToFleet.js";
import stopDeviceConnectivity from "./../AWS/stopDeviceConnectivity.js";

const addDevice = async (req, res) => {
  try {
    const { name, imei, fleet } = req.body;
    if (!name?.trim() || !imei?.trim() || !fleet?.trim()) {
      return res
        .status(400)
        .json({ error: "Name, IMEI and Fleet are required" });
    }
    await pgClient.query(
      "INSERT INTO devices (imei,fleet,name) VALUES ($1,$2,$3)",
      [imei, fleet, name]
    );
    await CreateThingAndAddToGroup(name, fleet);
    return res.status(201).json({ message: "Device created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const getDevices = async (req, res) => {
  try {
    const { rows } = await pgClient.query("SELECT * FROM devices");
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const getFleetDevices = async (req, res) => {
  try {
    const { fleet } = req.params;
    if (!fleet?.trim()) {
      return res.status(400).json({ error: "Fleet is required" });
    }
    const { rows } = await pgClient.query(
      "SELECT * FROM devices WHERE fleet=$1",
      [fleet]
    );
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const getDeviceByName = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name?.trim()) {
      return res.status(400).json({ error: "Name is required" });
    }
    const { rows } = await pgClient.query(
      "SELECT * FROM devices WHERE name=$1",
      [name]
    );
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const revokeDevice = async (req, res) => {
  try {
    const { certificateId } = req.params;
    const result = await stopDeviceConnectivity(certificateId);
    await pgClient.query(
      "UPDATE devices SET status=$1 WHERE certificate_id=$2",
      ["false", certificateId]
    );
    return res.status(200).json({ status: result });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const addImeiToWhitelist = async (req, res) => {
  try {
    const file = req.file;
    const { fleet } = req.body;
    if (!file || !fleet) {
      return res.status(400).json({ error: "Fleet and File is required" });
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
      const name_uniqe = `${fleet}_${imei}_sp_${Math.floor(
        Math.random() * 10
      )}`;
      await pgClient.query(
        "INSERT INTO devices(imei,fleet,name,certificate_id,status) VALUES ($1,$2,$3,$4,$5)",
        [imei, fleet, name_uniqe, "certificate_id", true]
      );
      await CreateThingAndAddToGroup(name_uniqe, fleet, imei, pgClient);
    }
    if (duplicates.length) {
      return res.status(400).json({ error: "Duplicate imei_no", duplicates });
    }
    return res.status(200).json({ message: "Whitelist uploaded successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const addImeiToBlacklist = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "File is required" });
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
      const { rows } = await pgClient.query(
        "SELECT certificate_id FROM devices WHERE imei=$1",
        [imei]
      );
      await pgClient.query("UPDATE devices SET status=$1 WHERE imei=$2", [
        "false",
        imei,
      ]);
      await stopDeviceConnectivity(rows[0].certificate_id);
    }

    if (duplicates.length) {
      return res.status(400).json({ error: "Duplicate imei_no", duplicates });
    }
    return res.status(200).json({ message: "Blacklist uploaded successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
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

const getCertificate = async (req, res) => {
  try {
    const { imei } = req.params;
    const { rowCount, rows } = await pgClient.query(
      "SELECT * FROM devices WHERE imei=$1",
      [imei]
    );
    if (!rowCount) {
      return res.status(404).json({ error: "Device not found" });
    }
    const deviceName = rows[0].name;
    const certDir = `./src/AWS/certificates/${deviceName}`;
    const files = [
      "AmazonRootCA1.pem",
      "certificate.pem.crt",
      "private.pem.key",
    ];
    for (const file of files) {
      const filePath = path.join(certDir, file);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: `File ${file} not found` });
      }
    }
    res.attachment(`${deviceName}_certificates.zip`);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level
    });
    archive.on("error", function (err) {
      throw err;
    });
    archive.pipe(res);
    for (const file of files) {
      const filePath = path.join(certDir, file);
      archive.file(filePath, { name: file });
    }
    await archive.finalize();
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};
export {
  addDevice,
  getDevices,
  getFleetDevices,
  getDeviceByName,
  revokeDevice,
  addImeiToWhitelist,
  addImeiToBlacklist,
  getCertificate,
};
