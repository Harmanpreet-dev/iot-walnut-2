const { pgClient } = require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uploadImage } = require("../service/imageUploader");

const adduserdetail = async (req, res) => {
  // uploadImage(req, res, async function (err) {
  //   if (err) {
  //     return res.status(500).json({ error: err.message });
  //   }

  //   try {
  //     const { name, email, phone, password, role, author_id, author_name } =
  //       req.body;

  //     // Check if the email already exists
  //     const emailCheckResult = await pgClient.query(
  //       "SELECT * FROM users WHERE email = $1",
  //       [email]
  //     );

  //     if (emailCheckResult.rows.length > 0) {
  //       return res.status(400).json({ error: "Email already exists" });
  //     }

  //     const hashedPassword = await bcrypt.hash(password, 10);
  //     const photo = req.file ? req.file.filename : null;

  //     let result = await pgClient.query(
  //       "INSERT INTO users (name, email, phone, password, photo, role, author_id, author_name ) VALUES ($1, $2, $3, $4, $5, $6,$7, $8)",
  //       [name, email, phone, hashedPassword, photo, 2, author_id, author_name]
  //     );

  //     res.json({
  //       message: "A new person was created",
  //       body: {
  //         user: { result },
  //       },
  //     });
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // });
  try {
    res.status(200).json(true);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getuserdetail = async (req, res) => {
  try {
    let data = await pgClient.query(
      "SELECT * FROM users WHERE role=$1 ORDER BY name ASC",
      [2]
    );
    res.status(200).json(data.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateuserdetail = async (req, res) => {
  uploadImage(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      const { id, name, email, phone } = req.body;

      // Check if the email is used by another user
      const emailCheckResult = await pgClient.query(
        "SELECT * FROM users WHERE email = $1 AND id != $2",
        [email, id]
      );

      if (emailCheckResult.rows.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const photo = req.file ? req.file.filename : null;

      if (photo == null) {
        let result = await pgClient.query(
          "UPDATE users SET name=$1, email=$2, phone=$3 WHERE id=$4",
          [name, email, phone, id]
        );
        res.json(result);
      } else {
        let result = await pgClient.query(
          "UPDATE users SET name=$1, email=$2, phone=$3, photo=$4 WHERE id=$5",
          [name, email, phone, photo, id]
        );
        res.json(result);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
};

module.exports = {
  adduserdetail,
  getuserdetail,
  updateuserdetail,
};
