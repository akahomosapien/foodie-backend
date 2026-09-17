import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true only for port 465
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  //   family: 4, // Force IPv4
});

//SEND OTP MAIL
export const sendOTPMail = async ({ email, otp }) => {
  try {
    // Verify SMTP connection
    await transporter.verify();

    const mailConfigurations = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Reset Your Password",
      // This would be the text of email body
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 500px;
        margin: 10px auto;
        background: #ffffff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        text-align: center;
      }
      .logo {
        font-size: 22px;
        font-weight: bold;
        color: #4f46e5;
        margin-bottom: 20px;
      }
      h2 {
        color: #333;
      }
      p {
        color: #555;
        line-height: 1.6;
        font-size:15px;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 20px;
        background-color: #4f46e5;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      }
      .footer {
        margin-top: 25px;
        font-size: 12px;
        color: #999;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="logo">${process.env.APP_NAME}! 🚀</div>

      <h2>Forgot Password Email</h2>

      <p>
        Hi there 👋,<br /><br />
        Please enter the below OTP to reset your password. Your forgot password OTP is: 
      </p>

      <a href="" class="btn">
        ${otp}
      </a>

      <p class="footer">
        If you didn’t request this, you can safely ignore this email.
      </p>
    </div>
  </body>
  </html>
  `,
    };

    const info = await transporter.sendMail(mailConfigurations);

    console.log("✅ Email sent successfully");
    console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};
