import AWS from "aws-sdk";

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
    return "Device deactivated successfully.";
  } catch (err) {
    console.error("Error stopping device connectivity:", err);
  }
};

export default stopDeviceConnectivity;
