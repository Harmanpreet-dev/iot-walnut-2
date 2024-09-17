// sendEmail.js

import sgMail from "@sendgrid/mail";
import { logger } from "../utils/logger.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendOtpEmail(to, otp) {
  const msg = {
    to,
    from: "harmanpreet.singh@iamtechie.com",
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
    html: `<strong>Your OTP code is ${otp}</strong>`,
  };
  try {
    logger([`Send Email started to ${to}`]);
    await sgMail.send(msg);
    logger([`Send Email ended to ${to}`]);
  } catch (error) {
    throw Error(error);
  }
}

export default sendOtpEmail;
