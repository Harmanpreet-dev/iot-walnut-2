// sendEmail.js

const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Store your API key in environment variables for security

/**
 * Send an OTP email
 * @param {string} to - Recipient's email address
 * @param {string} otp - The OTP to be sent
 */
// async function sendOtpEmail(to, otp) {
//   const msg = {
//     to,
//     from: "harmanpreet.singh@iamtechie.com", // Your verified sender
//     subject: "Your OTP Code",
//     text: `Your OTP code is ${otp}`,
//     html: `<strong>Your OTP code is ${otp}</strong>`,
//   };

//   try {
//     await sgMail.send(msg);
//     console.log("OTP email sent successfully");
//   } catch (error) {
//     console.error("Error sending OTP email:", error);
//   }
// }
async function sendOtpEmail(to, otp) {
  const msg = {
    to,
    from: "harmanpreet.singh@iamtechie.com", // Your verified sender
    subject: "Hello Welcome",
    text: `Hello`,
    html: `<strong>hello Harman</strong>`,
    headers: {
      "X-Priority": "1", // High priority
      "X-MSMail-Priority": "High", // High priority for Microsoft email clients
    },
  };

  try {
    const response = await sgMail.send(msg);
    console.log("OTP email sent successfully");
    console.log("Response:", response);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    if (error.response) {
      console.error("Error response body:", error.response.body);
    }
  }
}

module.exports = sendOtpEmail;
