const AWS = require("aws-sdk");

// Set the region for AWS services
AWS.config.update({ region: "us-east-1" });

// Create an AWS IoT object
const iot = new AWS.Iot();

// Function to get the status of a job
function getJobStatus(jobId, thingArn) {
  const params = {
    jobId: jobId, // The ID of the job
    thingName: thingArn, // ARN or name of the IoT device (thing)
  };

  // Call describeJobExecution to get the status for a particular device
  iot.describeJobExecution(params, (err, data) => {
    if (err) {
      console.error("Error getting job execution status:", err);
    } else {
      console.log("Job execution status:", data.executionStatus);
    }
  });
}

// // Function to list all devices for a specific job and their statuses
function listJobExecutionsForJob(jobId) {
  return new Promise((resolve, reject) => {
    const params = {
      jobId: jobId, // The ID of the job
    };

    iot.listJobExecutionsForJob(params, (err, data) => {
      if (err) {
        console.error("Error listing job executions:", err);
        reject(err); // Reject the promise if there's an error
      } else {
        // Map the execution summaries and return the result
        const result = data.executionSummaries.map((execution) => {
          return execution;
        });
        resolve(result); // Resolve the promise with the result
      }
    });
  });
}

// // Example usage:
// // Replace with your Job ID and Thing ARN
// const jobId = "exampleJobId";
// const thingArn = "arn:aws:iot:us-east-1:123456789012:thing/MyDevice";

// // Get the status of the job for a specific device
// getJobStatus(jobId, thingArn);

// // List all devices and their statuses for the job
// listJobExecutionsForJob(jobId);

module.exports = {
  getJobStatus,
  listJobExecutionsForJob,
};
