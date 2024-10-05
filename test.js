const nodemailer = require("nodemailer");

const sendEmail = ({ to, subject, message, otp, purpose, attachments }) => 
  new Promise((resolve, reject) => {
    
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: white;">
              <tr>
                  <td style="padding: 30px; text-align: center; background-color: #cd2c22; color: white;">
                      <h1 style="margin: 0; font-size: 24px;">Account OTP Verification</h1>
                  </td>
              </tr>
              <tr>
                  <td style="padding: 20px; font-size: 16px; line-height: 24px; color: #555555;">
                      <p style="margin: 0 0 20px;">Dear User,</p>
                      <p style="margin: 0 0 20px;">
                          Thank you for choosing to ${purpose === 'login' ? 'log in to' : 'register an account with'} our service. Please use the OTP below to complete the ${purpose === 'login' ? 'login' : 'registration'} process:
                      </p>
                      <div style="text-align: center; margin: 20px 0;">
                          <span style="display: inline-block; font-size: 30px; color: #cd2c22; font-weight: bold; padding: 10px 20px; border: 2px solid #cd2c22; border-radius: 5px;">
                              ${otp}
                          </span>
                      </div>
                      <p style="margin: 0 0 20px;">
                          This OTP is valid for the next 10 minutes. Please do not share this OTP with anyone for security reasons.
                      </p>
                      <p style="margin: 0 0 20px;">
                          If you did not attempt to ${purpose === 'login' ? 'log in' : 'register'} to our platform, please ignore this email.
                      </p>
                      <p style="margin: 0 0 20px;">
                          Sincerely,<br>
                          The Support Team
                      </p>
                  </td>
              </tr>
              <tr>
                  <td style="padding: 20px; text-align: center; background-color: #eeeeee; color: #777777; font-size: 12px;">
                      <p style="margin: 0;">You received this email because you requested an OTP for ${purpose === 'login' ? 'logging in' : 'registering'} to your account.</p>
                      <p style="margin: 0;">If you didn’t make this request, please contact our support team immediately.</p>
                  </td>
              </tr>
          </table>
      </div>`;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    transport.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      text: message, 
      html: htmlTemplate, 
      attachments: attachments
    }, (err, info) => {
      if (err) {
        console.log(err);
        reject(err); 
      } else {
        console.log(`Email sent: ${info.response}`);
        resolve(true); 
      }
    });
});

module.exports = sendEmail;
