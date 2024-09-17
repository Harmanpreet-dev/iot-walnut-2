import { pgClient } from "../config/dbConfig.js";

const getLogs = async (req, res) => {
  try {
    const { rows } = await pgClient.query("SELECT * FROM logs");
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

export { getLogs };
