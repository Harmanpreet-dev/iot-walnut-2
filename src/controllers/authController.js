import { pgClient } from "../config/dbConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: "Email and Password are required" });
    }
    const { rows } = await pgClient.query(
      "SELECT * FROM users where email=$1",
      [email]
    );
    if (rows.length) {
      const { id, name, email, role, photo, phone, totp } = rows[0];
      const passwordMatch = await bcrypt.compare(password, rows[0].password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid Email or Password" });
      }
      const token = jwt.sign(
        {
          id,
          email,
          version: role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "12h",
        }
      );
      return res.status(200).json({
        data: {
          id,
          name,
          email,
          role,
          image: photo,
          phone,
          google_secret: totp,
        },
        token,
      });
    } else {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;
    const { rowCount } = await pgClient.query(
      "SELECT email from users where email=$1",
      [email]
    );
    if (!rowCount) {
      return res.status(404).json({ error: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User has been logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { password, new_password, id } = req.body;
    if (!id || !password?.trim() || !new_password?.trim()) {
      return res
        .status(400)
        .json({ error: "Id, Current Password and New Password are required" });
    }
    const { rows } = await pgClient.query(
      "SELECT password FROM users WHERE id=$1",
      [id]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "User not found" });
    }
    const currentHashedPassword = rows[0].password;
    const isSame = await bcrypt.compare(password, currentHashedPassword);
    if (!isSame) {
      return res.status(400).json({ error: "Incorrect current password" });
    }
    const hashedNewPassword = await bcrypt.hash(new_password, 10);
    await pgClient.query("UPDATE users SET password=$1 WHERE id=$2", [
      hashedNewPassword,
      id,
    ]);
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const generateToken = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: "Email and Password is required" });
    }
    const { rows } = await pgClient.query(
      "SELECT * FROM users where email=$1",
      [email]
    );
    if (!rows.length) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const userData = rows[0];
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ email: email }, "abc", {
      expiresIn: "12h",
    });
    return res.status(200).json({ token });
  } catch (err) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

export { loginUser, logoutUser, changePassword, generateToken };
