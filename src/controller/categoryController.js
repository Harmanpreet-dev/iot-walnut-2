const { pgClient } = require("../db/connection");

const addCategory = async (req, res) => {
  try {
    const { categoryName, name, img } = req.body;
    const task = `Category Added: ${categoryName}`;

    let result = await pgClient.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [categoryName]
    );
    const status = result.rowCount > 0 ? "success" : "failed";

    await pgClient.query(
      "INSERT INTO logger (name, img, status, task, timestamp) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)",
      [name, img, status, task]
    );

    res.json({
      message: "A new category was created",
      body: {
        category: result.rows[0],
      },
    });
  } catch (err) {
    const task = `Category Add Failed: ${req.body.categoryName}`;
    const status = "error";

    // Log the error to the logger table
    await pgClient.query(
      "INSERT INTO logger (name, img, status, task, timestamp) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)",
      [req.body.name, req.body.img, status, task]
    );

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
