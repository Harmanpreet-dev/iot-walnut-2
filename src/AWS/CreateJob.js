const AWS = require("aws-sdk");

// Set the region for AWS services
AWS.config.update({ region: "us-east-1" });

// Create an AWS IoT object
const iot = new AWS.Iot();

// Function to create a job
function createIoTJob(
  id,
  arn,
  json,
  description,
  insertedId,
  pgClient,
  type = "sch"
) {
  const params = {
    jobId: id, // Unique job ID
    targets: arn, // List of target ARNs (e.g., thing ARN)
    document: json, // Job document as a JSON string
    description: description, // Job description
    targetSelection: "SNAPSHOT", // Can be 'SNAPSHOT' or 'CONTINUOUS'
    // documentType: "JSON", // Document type
  };

  iot.createJob(params, async (err, data) => {
    if (err) {
      console.error("Error creating job:", err);
    } else {
      console.log(insertedId, data.jobArn, type);
      if (type == "sch") {
        await pgClient.query("UPDATE schedule SET arn=$1 WHERE id=$2", [
          data.jobArn,
          insertedId,
        ]);
      } else {
        await pgClient.query("UPDATE ota_update SET arn=$1 WHERE id=$2", [
          data.jobArn,
          insertedId,
        ]);
      }
      console.log("Job created successfully:", data.jobArn);
    }
  });
}

module.exports = createIoTJob;
