const { pgClient } = require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uploadImage } = require("../service/imageUploader");

const getAdmins = async (req, res) => {
  try {
    let data = await pgClient.query(
      "SELECT * FROM users WHERE role=$1 ORDER BY name ASC",
      [1]
    );
    res.status(200).json(data.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleAdmins = async (req, res) => {
  try {
    let { email } = req.body;

    let data = await pgClient.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    res
      .status(200)
      .json({ totp: data.rows[0].totp, totp_qr: data.rows[0].totp_qr });
  } catch (err) {
    res.status(500).json(err);
  }
};

const addAdmin = async (req, res) => {
  uploadImage(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      const { name, email, phone, password, role } = req.body;

      // Check if the email already exists
      const emailCheckResult = await pgClient.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (emailCheckResult.rows.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const photo = req.file ? req.file.filename : null;

      let result = await pgClient.query(
        "INSERT INTO users (name, email, phone, password, photo, role) VALUES ($1, $2, $3, $4, $5, $6)",
        [name, email, phone, hashedPassword, photo, 1]
      );

      res.json({
        message: "A new person was created",
        body: {
          user: { result },
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
};

const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email already exists
    const emailCheckResult = await pgClient.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.send(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const checkEmailEdit = async (req, res) => {
  try {
    const { email, id } = req.body;

    // Check if the email already exists
    const emailCheckResult = await pgClient.query(
      "SELECT * FROM users WHERE email = $1 AND id != $2",
      [email, id]
    );

    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.send(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
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

      res.status(200).json({
        data: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          image: userData.photo,
          phone: userData.phone,
          google_secret: userData.totp,
        },
        token,
      });
    } else {
      return res.status(401).json({ error: "Authentication failed" });
    }
  } catch (err) {
    res.json(err);
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    pgClient.query("UPDATE users SET jwt=$1 where email=$2", [null, email]);

    res.status(200).json(true);
  } catch (err) {
    res.json(err);
  }
};

const updateAdmin = async (req, res) => {
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

const deleteAdmin = async (req, res) => {
  try {
    await pgClient.query("DELETE FROM users where id = $1", [req.body.id]);
    res.json(`User ${req.body.id} was deleted `);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  loginUser,
  logoutUser,
  getSingleAdmins,
  checkEmail,
  checkEmailEdit,
};
