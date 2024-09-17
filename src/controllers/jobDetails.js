import { listJobExecutionsForJob } from "../AWS/JobDetails.js";

const jobDetails = async (req, res) => {
  try {
    const { arn } = req.body;
    if (!arn?.trim()) {
      return res.status(400).json({ error: "arn is required" });
    }
    const jobId = arn.split("/").pop();
    const result = await listJobExecutionsForJob(jobId);
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};
export { jobDetails };
