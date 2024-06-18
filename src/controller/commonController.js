const { pgClient } = require("../db/connection");
const { uploadImage } = require("../service/imageUploader");
const { generateAndSendOtp, verifyOtp } = require("../service/opthandler");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

const vertifyTokenStatus = async (req, res) => {
  try {
    res.status(200).json(true);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProfile = async (req, res) => {
  uploadImage(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      const { name, email, phone, token } = req.body;

      await pgClient.query(
        "UPDATE users SET name=$1, email=$2, phone=$3 where jwt=$4",
        [name, email, phone, token]
      );

      res.json({ name, email, phone, token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
};

const sendEmailOTP = async (req, res) => {
  const email = "harmanpreet.techie@gmail.com";
  await generateAndSendOtp(email);
  res.status(200).send("OTP sent");
};

const verifyEmailOTP = async (req, res) => {
  const { email, otp } = req.body;
  const isValid = await verifyOtp(email, otp);

  if (isValid) {
    res.status(200).send("OTP verified");
  } else {
    res.status(400).send("Invalid OTP");
  }
};

const generateGoogleOTP = async (req, res) => {
  let { email } = req.body;

  const secret = speakeasy.generateSecret({ name: `IOT_${email}`, length: 20 });

  qrcode.toDataURL(secret.otpauth_url, async (err, data_url) => {
    await pgClient.query("UPDATE users SET totp=$1,totp_qr=$2 where email=$3", [
      secret,
      data_url,
      email,
    ]);

    res.json({ secret: secret.base32, qrcode: data_url });
  });
};

const verifyGoogleOTP = async (req, res) => {
  const { token, secret } = req.body;
  const verified = speakeasy.totp.verify({
    secret: secret,
    encoding: "base32",
    token: token,
  });
  res.json({ verified });
};

module.exports = {
  vertifyTokenStatus,
  updateProfile,
  sendEmailOTP,
  verifyEmailOTP,
  generateGoogleOTP,
  verifyGoogleOTP,
};
