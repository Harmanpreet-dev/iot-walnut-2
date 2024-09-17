import { checkEmailExists } from "../utils/email.js";
import jwt from "jsonwebtoken";
import { pgClient } from "./../config/dbConfig.js";
import {
  generateAndSendOtp,
  generateEmailUpdateOtp,
  verifyOtp,
} from "./../services/opthandler.js";
import { validateEmail } from "../utils/validator.js";

const isEmailExists = async (req, res) => {
  try {
    const { email } = req.body;
    const emailExists = checkEmailExists(email);
    return res.status(200).send(emailExists ? true : false);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const updateEmail = async (req, res) => {
  try {
    const { email, newEmail, id } = req.body;
    const { rows } = await pgClient.query(
      "SELECT * FROM users WHERE email = $1 AND id=$2",
      [email, id]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "User does not exixts" });
    }
    if (!validateEmail(newEmail)) {
      return res.status(400).json({ error: "Please enter a valid New Email" });
    }
    await generateEmailUpdateOtp({ email, newEmail });
    return res.status(200).json({
      message: "OTP has been sent to the new email",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const verifyUpdateEmailOtp = async (req, res) => {
  try {
    const { id, otp, email } = req.body;
    const { rows } = await pgClient.query(
      "SELECT new_email, otp FROM users WHERE id = $1 and email=$2",
      [id, email]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "User does not exist" });
    }
    const user = rows[0];
    const { new_email } = user;
    if (user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    await pgClient.query(
      "UPDATE users SET email = $1, new_email = NULL, otp = NULL WHERE id = $2",
      [new_email || email, id]
    );
    const token = jwt.sign({ id, email: new_email }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    return res.status(200).json({
      message: "Email has been updated successfully",
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

const sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid Email" });
  }
  await generateAndSendOtp(email);
  return res.status(200).json({ message: "OTP has been sent successfully" });
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const isValid = await verifyOtp(email, otp);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    return res
      .status(200)
      .json({ message: "OTP has been Verified Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
};

export { isEmailExists, updateEmail, verifyUpdateEmailOtp, sendOTP, verifyOTP };
