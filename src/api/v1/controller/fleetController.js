const CreateFleetAWS = require("../AWS/CreateFleet");
const { pgClient } = require("../db/connection");

const addFleet = async (req, res) => {
  try {
    const { name, admin, category } = req.body;

    await pgClient.query(
      "INSERT INTO fleets (name, admin, category) VALUES ($1, $2, $3)",
      [name, admin, category]
    );

    let result = await CreateFleetAWS(name);

    res.status(200).json("Fleet was Added");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFleet = async (req, res) => {
  try {
    let result = await pgClient.query("SELECT * FROM fleets");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFleetByAdmin = async (req, res) => {
  try {
    let { id } = req.body;
    let result = await pgClient.query("SELECT * FROM fleets WHERE admin=$1", [
      id,
    ]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserCategory = async (req, res) => {
  try {
    let users = await pgClient.query("SELECT * FROM users WHERE role=$1", [1]);
    let category = await pgClient.query("SELECT * FROM categories");

    res.status(200).json({ users: users.rows, category: category.rows });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addFleet,
  getFleet,
  getFleetByAdmin,
  getUserCategory,
};
