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
// async function sendOtpEmail(to, otp) {
//   const msg = {
//     to,
//     from: "harmanpreet.singh@iamtechie.com", // Your verified sender
//     subject: "Hello Welcome",
//     text: `Hello`,
//     html: `<strong>hello Harman</strong>`,
//     headers: {
//       "X-Priority": "1", // High priority
//       "X-MSMail-Priority": "High", // High priority for Microsoft email clients
//     },
//   };
//   // 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

//   try {
//     const response = await sgMail.send(msg);
//     console.log("OTP email sent successfully");
//     console.log("Response:", response);
//   } catch (error) {
//     console.error("Error sending OTP email:", error);
//     if (error.response) {
//       console.error("Error response body:", error.response.body);
//     }
//   }
// }

async function sendOtpEmail(to, otp) {
  // Create a SMTP transporter using your SMTP credentials
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com", // Replace with your SMTP server hostname
    port: 587, // Replace with your SMTP server port
    secure: false, // true for 465, false for other ports
    auth: {
      user: "harmanpreet.singh@iamtechie.com", // Replace with your SMTP username
      pass: "xsmtpsib-b7a1377c6ddc7c2502b6fc87496d284ae10f631b8992e56996addc9012b26d47-kC1XRs28L9P3QSEU", // Replace with your SMTP password
    },
  });

  // Email content
  const mailOptions = {
    from: "harmanpreet.singh@iamtechie.com", // Sender address
    to: to, // Recipient addressq
    subject: "Hello Welcome", // Email subject
    text: "Hello", // Plain text body
    html: "<strong>Hello Harman</strong>", // HTML body
    headers: {
      "X-Priority": "1", // High priority
      "X-MSMail-Priority": "High", // High priority for Microsoft email clients
    },
  };

  try {
    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
}

module.exports = sendOtpEmail;
