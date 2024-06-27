const AWS = require("aws-sdk");

// Set the region
AWS.config.update({ region: "us-east-1" });

const iot = new AWS.Iot();

const stopDeviceConnectivity = async (certificateId) => {
  try {
    await iot
      .updateCertificate({
        certificateId: certificateId,
        newStatus: "INACTIVE",
      })
      .promise();
    console.log("Device deactivated successfully.");
    return "Device deactivated successfully.";
  } catch (err) {
    console.error("Error stopping device connectivity:", err);
  }
};

module.exports = stopDeviceConnectivity;
