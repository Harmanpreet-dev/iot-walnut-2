import { pgClient } from "./../config/dbConfig.js";
import CreateFleetAWS from "../AWS/CreateFleet.js";

const addFleet = async (req, res) => {
  try {
    const { name, admin, category } = req.body;
    if (!name?.trim() || !admin?.trim() || !category?.trim()) {
      return res
        .status(400)
        .json({ error: "Name, Admin and Category is required" });
    }
    await pgClient.query(
      "INSERT INTO fleets (name, admin, category) VALUES ($1, $2, $3)",
      [name, admin, category]
    );
    await CreateFleetAWS(name);
    return res.status(201).json({ message: "Fleet created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const getFleets = async (req, res) => {
  try {
    const { rows } = await pgClient.query("SELECT * FROM fleets");
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const getFleetsByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id?.trim()) {
      return res.status(400).json({ error: "Id is required" });
    }
    const { rows } = await pgClient.query(
      "SELECT * FROM fleets WHERE admin=$1",
      [id]
    );
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const getUsersAndCategories = async (req, res) => {
  try {
    const users = await pgClient.query("SELECT * FROM users WHERE role=$1", [
      1,
    ]);
    const categories = await pgClient.query("SELECT * FROM categories");
    return res
      .status(200)
      .json({ users: users.rows, categories: categories.rows });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

export { addFleet, getFleets, getFleetsByAdmin, getUsersAndCategories };
