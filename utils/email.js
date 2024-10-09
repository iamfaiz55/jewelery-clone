const nodemailer = require("nodemailer");

const sendEmail = ({ to, subject, otp, attachments }) => new Promise((resolve, reject) => {
    let html;

    // User Login OTP
    if (subject === "User Login OTP") {
        html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e3c091; background-color: #faf8f2;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: white;">
                <tr>
                    <td style="padding: 30px; text-align: center; background-color: #b78628; color: white;">
                        <h1 style="margin: 0; font-size: 24px;">Login OTP Request</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; font-size: 16px; line-height: 24px; color: #555555;">
                        <p style="margin: 0 0 20px;">Dear User,</p>
                        <p style="margin: 0 0 20px;">
                            We received a request to log in to your account. Please use the OTP below to proceed with your login. This OTP is valid for the next 10 minutes:
                        </p>
                        <div style="text-align: center; margin: 20px 0;">
                            <span style="display: inline-block; font-size: 30px; color: #b78628; font-weight: bold; padding: 10px 20px; border: 2px solid #b78628; border-radius: 5px;">
                                ${otp}
                            </span>
                        </div>
                        <p style="margin: 0 0 20px;">
                            If you didn’t request this login, you can safely ignore this email. Your account will remain secure.
                        </p>
                        <p style="margin: 0 0 20px;">
                            Sincerely,<br>
                            The Support Team
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; background-color: #f1e9d5; color: #777777; font-size: 12px;">
                        <p style="margin: 0;">You received this email because a login was attempted for your account using this email address.</p>
                        <p style="margin: 0;">If this wasn't you, please contact our support team immediately.</p>
                    </td>
                </tr>
            </table>
        </div>`;
    }

    // Admin Login OTP
    if (subject === "Admin Login OTP") {
        html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e3c091; background-color: #faf8f2;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: white;">
                <tr>
                    <td style="padding: 30px; text-align: center; background-color: #b78628; color: white;">
                        <h1 style="margin: 0; font-size: 24px;">Admin Login OTP Request</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; font-size: 16px; line-height: 24px; color: #555555;">
                        <p style="margin: 0 0 20px;">Dear Admin,</p>
                        <p style="margin: 0 0 20px;">
                            We received a request to log in to the admin dashboard. Please use the OTP below to proceed with your login. This OTP is valid for the next 10 minutes:
                        </p>
                        <div style="text-align: center; margin: 20px 0;">
                            <span style="display: inline-block; font-size: 30px; color: #b78628; font-weight: bold; padding: 10px 20px; border: 2px solid #b78628; border-radius: 5px;">
                                ${otp}
                            </span>
                        </div>
                        <p style="margin: 0 0 20px;">
                            If you didn’t request this login, you can safely ignore this email. Your account will remain secure.
                        </p>
                        <p style="margin: 0 0 20px;">
                            Best Regards,<br>
                            The Support Team
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; background-color: #f1e9d5; color: #777777; font-size: 12px;">
                        <p style="margin: 0;">You received this email because a login was attempted for the admin dashboard using this email address.</p>
                        <p style="margin: 0;">If this wasn't you, please contact our support team immediately.</p>
                    </td>
                </tr>
            </table>
        </div>`;
    }

    // Pay Slip
    if (subject === "Your Order Receipt") {
        html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e3c091; background-color: #faf8f2;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: white;">
                <tr>
                    <td style="padding: 30px; text-align: center; background-color: #b78628; color: white;">
                        <h1 style="margin: 0; font-size: 24px;">Pay Slip from SF Jewellers</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; font-size: 16px; line-height: 24px; color: #555555;">
                        <p style="margin: 0 0 20px;">Dear Valued Customer,</p>
                        <p style="margin: 0 0 20px;">
                            Thank you for choosing SF Jewellers! We appreciate your trust in us. Below is the pay slip detailing your recent transaction.
                        </p>
                        <p style="margin: 0 0 20px;">
                            <strong>Transaction Details:</strong>
                        </p>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                            <tr>
                                <th style="border: 1px solid #e3c091; padding: 8px; text-align: left;">Item Description</th>
                                <th style="border: 1px solid #e3c091; padding: 8px; text-align: right;">Amount</th>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #e3c091; padding: 8px;">Gold Necklace</td>
                                <td style="border: 1px solid #e3c091; padding: 8px; text-align: right;">$500.00</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #e3c091; padding: 8px;">Diamond Ring</td>
                                <td style="border: 1px solid #e3c091; padding: 8px; text-align: right;">$1,200.00</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #e3c091; padding: 8px; font-weight: bold;">Total Amount</td>
                                <td style="border: 1px solid #e3c091; padding: 8px; text-align: right; font-weight: bold;">$1,700.00</td>
                            </tr>
                        </table>
                        <p style="margin: 0 0 20px;">
                            Your satisfaction is our top priority. If you have any questions or require further assistance, please feel free to reach out to our support team.
                        </p>
                        <p style="margin: 0 0 20px;">
                            Thank you for being a part of the SF Jewellers family! We look forward to serving you again.
                        </p>
                        <p style="margin: 0 0 20px;">
                            Best Regards,<br>
                            The SF Jewellers Team
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; background-color: #f1e9d5; color: #777777; font-size: 12px;">
                        <p style="margin: 0;">You received this pay slip because you made a purchase at SF Jewellers.</p>
                        <p style="margin: 0;">If you have any concerns regarding this transaction, please contact us immediately.</p>
                    </td>
                </tr>
            </table>
        </div>`;
    }

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
        text: `Your OTP: ${otp}`, 
        html,
        attachments
    }, err => {
        if (err) {
            console.log(err);
            reject(false);
        } else {
            resolve(true);
        }
    });
});

module.exports = sendEmail;
