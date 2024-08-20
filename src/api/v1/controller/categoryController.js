const { pgClient } = require("../db/connection");

const addCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    let result = await pgClient.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [categoryName]
    );

    res.json("Category was created");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCategory = async (req, res) => {
  try {
    let data = await pgClient.query("SELECT * FROM categories");
    res.status(200).json(data.rows);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Error fetching categories" });
  }
};

module.exports = {
  addCategory,
  getCategory,
};
