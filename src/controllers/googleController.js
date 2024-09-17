import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { pgClient } from "../config/dbConfig.js";

import { validateEmail } from "../utils/validator.js";

const generateGoogleOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Please enter a valid Email" });
    }
    const secret = speakeasy.generateSecret({
      name: `IOT_${email}`,
      length: 20,
    });
    qrcode.toDataURL(secret.otpauth_url, async (err, data_url) => {
      await pgClient.query(
        "UPDATE users SET totp=$1,totp_qr=$2 where email=$3",
        [secret, data_url, email]
      );
      return res.status(200).json({ secret: secret.base32, qrcode: data_url });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "OTP Generation failed" });
  }
};

const verifyGoogleOTP = async (req, res) => {
  try {
    const { token, secret } = req.body;
    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: "base32",
      token: token,
    });
    return res.status(200).json({ verified });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.message || "OTP Verification failed" });
  }
};

export { generateGoogleOTP, verifyGoogleOTP };
