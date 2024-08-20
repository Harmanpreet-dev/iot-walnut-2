const { pgClient } = require("../db/connection");
const { uploadImage } = require("../service/imageUploader");
const { generateAndSendOtp, verifyOtp } = require("../service/opthandler");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const bcrypt = require("bcrypt");

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

// const changePassword = async (req, res) => {
//   try {
//     const { password, new_password, id } = req.body;

//     const hashedPassword = await bcrypt.hash(new_password, 10);

//     let result = await pgClient.query(
//       "UPDATE users SET password=$1 where password=$2",
//       [hashedPassword, id]
//     );

//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const changePassword = async (req, res) => {
  try {
    const { password, new_password, id } = req.body;

    // Fetch the current password from the database
    const result = await pgClient.query(
      "SELECT password FROM users WHERE jwt=$1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentHashedPassword = result.rows[0].password;

    // Compare the provided current password with the stored password
    const isMatch = await bcrypt.compare(password, currentHashedPassword);

    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect current password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(new_password, 10);

    // Update the password in the database
    await pgClient.query("UPDATE users SET password=$1 WHERE jwt=$2", [
      hashedNewPassword,
      id,
    ]);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const sendEmailOTP = async (req, res) => {
  const email = req.body.email;
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

const demo = async (req, res) => {
  res.json({ status: true });
};

module.exports = {
  vertifyTokenStatus,
  updateProfile,
  changePassword,
  sendEmailOTP,
  verifyEmailOTP,
  generateGoogleOTP,
  verifyGoogleOTP,
  demo,
};
