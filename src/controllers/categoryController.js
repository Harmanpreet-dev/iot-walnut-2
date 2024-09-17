import { pgClient } from "./../config/dbConfig.js";

const addCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName?.trim()) {
      return res.status(400).json({ error: "Category name is required" });
    }
    await pgClient.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [categoryName]
    );
    return res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const getCategories = async (req, res) => {
  try {
    const { rows } = await pgClient.query("SELECT * FROM categories");
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

export { addCategory, getCategories };
