// otpHandler.js
const otpGenerator = require("otp-generator");
const sendOtpEmail = require("./sendmail");
const { pgClient } = require("../db/connection");

/**
 * Generate and send an OTP
 * @param {string} email - Recipient's email address
 */
async function generateAndSendOtp(email) {
  // Generate a 6-digit numeric OTP
  const otp = otpGenerator.generate(6);

  // Send the OTP via email
  await sendOtpEmail(email, otp);

  // Store the OTP in your database or in-memory store for later verification
  await pgClient.query("UPDATE users SET otp=$1 where email=$2", [otp, email]);
  // For this example, we'll just log it
  console.log(`Generated OTP for ${email}: ${otp}`);
}

/**
 * Verify the OTP
 * @param {string} email - Recipient's email address
 * @param {string} otp - The OTP to be verified
 * @returns {boolean} - Whether the OTP is valid
 */
async function verifyOtp(email, otp) {
  // Retrieve the stored OTP for the given email from your database or in-memory store
  // For this example, we'll assume you have a function getStoredOtp(email)
  let result = await pgClient.query("SELECT * FROM users where email=$1", [
    email,
  ]);

  const storedOtp = result.rows[0].otp;

  return storedOtp === otp;
}

module.exports = {
  generateAndSendOtp,
  verifyOtp,
};
