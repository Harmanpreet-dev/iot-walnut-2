import { pgClient } from "../config/dbConfig.js";
import bcrypt from "bcrypt";
import { uploadImage } from "../services/imageUploader.js";
import { checkEmailExists } from "../utils/email.js";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "../utils/validator.js";

const addAdmin = async (req, res) => {
  uploadImage(req, res, async function (err) {
    if (err) {
      return res
        .status(500)
        .json({ error: err?.message || "Something went wrong" });
    }
    try {
      const { name, email, phone, password } = req.body;
      if (!validateName(name)) {
        return res.status(400).json({ error: "Please enter a valid Name" });
      }
      if (!validateEmail(email)) {
        return res.status(400).json({ error: "Please enter a valid Email" });
      }
      if (!validatePhone(phone)) {
        return res.status(400).json({ error: "Please enter a valid Phone" });
      }
      if (!validatePassword(password)) {
        return res.status(400).json({ error: "Please enter a valid Password" });
      }
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        return res.status(409).json({ error: "Email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const photo = req.file ? req.file.filename : null;
      await pgClient.query(
        "INSERT INTO users (name, email, phone, password, photo, role) VALUES ($1, $2, $3, $4, $5, $6)",
        [name, email, phone, hashedPassword, photo, 1]
      );
      return res.status(200).json({ message: "Admin created successfully" });
    } catch (err) {
      return res
        .status(500)
        .json({ error: err?.message || "Something went wrong" });
    }
  });
};

const getAdmins = async (req, res) => {
  try {
    const { rows } = await pgClient.query(
      "SELECT * FROM users WHERE role=$1 ORDER BY name ASC",
      [1]
    );
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id?.trim()) {
      return res.status(400).json({ error: "Admin Id is required" });
    }
    const { rows } = await pgClient.query(
      "SELECT * FROM users WHERE id=$1 AND role=$2",
      [id, 1]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "Admin not found" });
    }
    return res
      .status(200)
      .json({ totp: rows[1].totp, totp_qr: rows[1].totp_qr });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const updateAdmin = async (req, res) => {
  uploadImage(req, res, async function (err) {
    if (err) {
      return res
        .status(500)
        .json({ error: err?.message || "Something went wrong" });
    }
    try {
      const { id } = req.params;
      let { name, email, phone } = req.body;
      if (!id?.trim() || !email?.trim()) {
        return res.status(400).json({
          error: "Id and Email is required",
        });
      }
      const user = await pgClient.query(
        "SELECT * FROM users WHERE email=$1 AND id=$2",
        [email, id]
      );
      if (!user?.rows.length) {
        return res.status(404).json({ error: "User not found" });
      }
      name = name || rows[0].name;
      phone = phone || rows[0].phone;
      const photo = req.file ? req.file.filename : null;
      if (photo == null) {
        await pgClient.query("UPDATE users SET name=$1, phone=$2 WHERE id=$3", [
          name,
          phone,
          id,
        ]);
      } else {
        await pgClient.query(
          "UPDATE users SET name=$1, phone=$2, photo=$3 WHERE id=$4",
          [name, phone, photo, id]
        );
      }
      const { rows } = await pgClient.query("SELECT * FROM users WHERE id=$1", [
        id,
      ]);
      return res.status(200).json(rows[0]);
    } catch (err) {
      return res
        .status(500)
        .json({ error: err?.message || "Something went wrong" });
    }
  });
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id?.trim()) {
      return res.status(400).json({ error: "Admin Id is required" });
    }
    const { rows } = await pgClient.query("SELECT * FROM users WHERE id=$1", [
      id,
    ]);
    if (!rows.length) {
      return res.status(404).json({ error: "Admin not found" });
    }
    await pgClient.query("DELETE FROM users where id=$1 AND role=$2", [id, 1]);
    return res.status(200).json({ message: `Admin deleted successfully` });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

export { getAdmins, addAdmin, updateAdmin, deleteAdmin, getAdmin };
