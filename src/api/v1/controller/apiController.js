const { pgClient } = require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uploadImage } = require("../service/imageUploader");

const generateToken = async (req, res) => {
  try {
    const { email, password } = req.body;

    let data = await pgClient.query("SELECT * FROM users where email=$1", [
      email,
    ]);

    if (data.rows.length !== 0) {
      let userData = data.rows[0];

      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Authentication failed" });
      }

      const token = jwt.sign({ email: email }, "abc", {
        expiresIn: "12h",
      });

      pgClient.query("UPDATE users SET jwt=$1 where email=$2", [token, email]);

      res.status(200).json({ token });
    } else {
      return res.status(401).json({ error: "Authentication failed" });
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  generateToken,
};
