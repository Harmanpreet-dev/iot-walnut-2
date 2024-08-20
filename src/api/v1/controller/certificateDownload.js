const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const { pgClient } = require("../db/connection");

const getCertificate = async (req, res) => {
  try {
    let { imei } = req.params;

    let result = await pgClient.query("SELECT * FROM devices WHERE imei=$1", [
      imei,
    ]);

    if (result.rowCount !== 0) {
      let deviceName = result.rows[0].name;
      let certDir = `./src/AWS/certificates/${deviceName}`;

      // Check if the certificate files exist
      let files = [
        "AmazonRootCA1.pem",
        "certificate.pem.crt",
        "private.pem.key",
      ];

      for (let file of files) {
        let filePath = path.join(certDir, file);
        if (!fs.existsSync(filePath)) {
          return res.status(404).json({ error: `File ${file} not found` });
        }
      }

      // Create a zip file and send it as a response
      res.attachment(`${deviceName}_certificates.zip`);

      let archive = archiver("zip", {
        zlib: { level: 9 }, // Sets the compression level
      });

      archive.on("error", function (err) {
        throw err;
      });

      // Pipe the archive data to the response
      archive.pipe(res);

      // Append files to the zip
      for (let file of files) {
        let filePath = path.join(certDir, file);
        archive.file(filePath, { name: file });
      }

      await archive.finalize();
    } else {
      res.status(404).json({ error: "Device not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getCertificate,
};
