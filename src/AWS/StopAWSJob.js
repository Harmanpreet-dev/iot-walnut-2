import AWS from "aws-sdk";

// Set the region
AWS.config.update({ region: "us-east-1" });

const iot = new AWS.Iot();

const StopAWSJob = async (jobArn) => {
  const jobId = jobArn.split("/").pop();
  try {
    await iot
      .cancelJob({
        jobId: jobId,
      })
      .promise();
    return "Job stopped successfully.";
  } catch (err) {
    console.error("Error stopping job:", err);
  }
};

export default StopAWSJob;
