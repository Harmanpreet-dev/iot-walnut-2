import otpGenerator from "otp-generator";
import { pgClient } from "./../config/dbConfig.js";
import sendOtpEmail from "./sendmail.js";

async function generateAndSendOtp(email) {
  const otp = otpGenerator.generate(6);
  await sendOtpEmail(email, otp);
  await pgClient.query("UPDATE users SET otp=$1 where email=$2", [otp, email]);
  return 0;
}

async function generateEmailUpdateOtp({ email, newEmail }) {
  const otp = otpGenerator.generate(6);
  await sendOtpEmail(newEmail, otp);
  await pgClient.query("UPDATE users SET otp=$1, new_email=$2 where email=$3", [
    otp,
    newEmail,
    email,
  ]);
  return 0;
}

async function verifyOtp(email, otp) {
  const { rows } = await pgClient.query("SELECT * FROM users where email=$1", [
    email,
  ]);
  const storedOtp = rows[0].otp;
  return storedOtp === otp;
}

export { generateAndSendOtp, generateEmailUpdateOtp, verifyOtp };
