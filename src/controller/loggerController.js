const { pgClient } = require("../db/connection");

const getLoggers = async (req, res) => {
  try {
    let data = await pgClient.query("SELECT * FROM logs");
    res.status(200).json(data.rows);
  } catch (err) {
    console.error("Error fetching logger:", err);
    res.status(500).json({ error: "Error fetching logger" });
  }
};

module.exports = {
  getLoggers,
};
