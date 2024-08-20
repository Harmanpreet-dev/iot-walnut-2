const { getJobStatus, listJobExecutionsForJob } = require("../AWS/JobDetails");

const getJobDetails = async (req, res) => {
  try {
    let jobArn = req.body.arn;

    const jobId = jobArn.split("/").pop();

    // Await the result from listJobExecutionsForJob
    let result = await listJobExecutionsForJob(jobId);

    // Send the result back in the response
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  getJobDetails,
};
