const { pgClient } = require("../db/connection");

const addFleet = async (req, res) => {
  try {
    const { name, category, admin } = req.body;

    let result = await pgClient.query(
      "INSERT INTO fleet (name, category, admin) VALUES ($1, $2, $3)",
      ["name", "category", "admin"]
    );

    // let result = await pgClient.query("SELECT * FROM fleet");

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addFleet,
};
