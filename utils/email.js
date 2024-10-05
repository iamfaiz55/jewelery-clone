const nodemailer = require("nodemailer");

const sendEmail = ({ to, subject, message, attachments, otp }) => new Promise((resolve, reject) => {
    let Html;
    
    if (subject === "Your Order Receipt") {
        let htmlTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: white;">
                <tr>
                    <td style="padding: 30px; text-align: center; background-color: #d4af37; color: white;">
                        <h1 style="margin: 0; font-size: 24px;">Thank You for Your Order!</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; font-size: 16px; line-height: 24px; color: #555555;">
                        <p style="margin: 0 0 20px;">
                            Thank you for choosing SF Jewellers.
                        </p>
                        <p style="margin: 0 0 20px;">
                            Your order receipt has been attached to this email as a PDF. Please review the details and keep it for your records.
                        </p>
                        <p style="margin: 0 0 20px;">
                            If you have any questions or need further assistance, feel free to contact our support team at <a href="mailto:support@sfjewellers.com" style="color: #d4af37;">support@sfjewellers.com</a>.
                        </p>
                        <p style="margin: 0 0 20px;">
                            We look forward to serving you again!
                        </p>
                        <p style="margin: 0 0 20px;">
                            Sincerely,<br>
                            The SF Jewellers Team
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; background-color: #eeeeee; color: #777777; font-size: 12px;">
                        <p style="margin: 0;">You received this email because you made a purchase at SF Jewellers.</p>
                        <p style="margin: 0;">If you did not make this purchase, please contact our support team immediately.</p>
                    </td>
                </tr>
            </table>
        </div>`;
    
        Html = htmlTemplate;
    }
    
    if (subject === "User Login OTP") {
        let htmlTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: white;">
                <tr>
                    <td style="padding: 30px; text-align: center; background-color: #d4af37; color: white;">
                        <h1 style="margin: 0; font-size: 24px;">Account OTP Verification</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; font-size: 16px; line-height: 24px; color: #555555;">
                        <p style="margin: 0 0 20px;">Dear User,</p>
                        <p style="margin: 0 0 20px;">
                            Thank you for choosing to log in to our service. Please use the OTP below to complete the login process:
                        </p>
                        <div style="text-align: center; margin: 20px 0;">
                            <span style="display: inline-block; font-size: 30px; color: #d4af37; font-weight: bold; padding: 10px 20px; border: 2px solid #d4af37; border-radius: 5px;">
                                ${otp}
                            </span>
                        </div>
                        <p style="margin: 0 0 20px;">
                            This OTP is valid for the next 10 minutes. Please do not share this OTP with anyone for security reasons.
                        </p>
                        <p style="margin: 0 0 20px;">
                            If you did not attempt to log in to our platform, please ignore this email.
                        </p>
                        <p style="margin: 0 0 20px;">
                            Sincerely,<br>
                            The Support Team
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; background-color: #eeeeee; color: #777777; font-size: 12px;">
                        <p style="margin: 0;">You received this email because you requested an OTP for logging in to your account.</p>
                        <p style="margin: 0;">If you didn’t make this request, please contact our support team immediately.</p>
                    </td>
                </tr>
            </table>
        </div>`;
    
        Html = htmlTemplate;
    }
    
    if (subject === "User Register OTP") {
        let htmlTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: white;">
                <tr>
                    <td style="padding: 30px; text-align: center; background-color: #d4af37; color: white;">
                        <h1 style="margin: 0; font-size: 24px;">Account Registration OTP Verification</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; font-size: 16px; line-height: 24px; color: #555555;">
                        <p style="margin: 0 0 20px;">Dear User,</p>
                        <p style="margin: 0 0 20px;">
                            Thank you for choosing to register an account with our service. Please use the OTP below to complete your registration process:
                        </p>
                        <div style="text-align: center; margin: 20px 0;">
                            <span style="display: inline-block; font-size: 30px; color: #d4af37; font-weight: bold; padding: 10px 20px; border: 2px solid #d4af37; border-radius: 5px;">
                                ${otp}
                            </span>
                        </div>
                        <p style="margin: 0 0 20px;">
                            This OTP is valid for the next 10 minutes. Please do not share this OTP with anyone for security reasons.
                        </p>
                        <p style="margin: 0 0 20px;">
                            If you did not attempt to register on our platform, please ignore this email.
                        </p>
                        <p style="margin: 0 0 20px;">
                            Sincerely,<br>
                            The Support Team
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; background-color: #eeeeee; color: #777777; font-size: 12px;">
                        <p style="margin: 0;">You received this email because you requested an OTP for registering an account.</p>
                        <p style="margin: 0;">If you didn’t make this request, please contact our support team immediately.</p>
                    </td>
                </tr>
            </table>
        </div>`;
    
        Html = htmlTemplate;
    }
    
    if (subject === "Admin Login OTP") {
        let htmlTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: white;">
                <tr>
                    <td style="padding: 30px; text-align: center; background-color: #d4af37; color: white;">
                        <h1 style="margin: 0; font-size: 24px;">Admin Account OTP Verification</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; font-size: 16px; line-height: 24px; color: #555555;">
                        <p style="margin: 0 0 20px;">Dear Admin,</p>
                        <p style="margin: 0 0 20px;">
                            Please use the OTP below to complete your login process:
                        </p>
                        <div style="text-align: center; margin: 20px 0;">
                            <span style="display: inline-block; font-size: 30px; color: #d4af37; font-weight: bold; padding: 10px 20px; border: 2px solid #d4af37; border-radius: 5px;">
                                ${otp}
                            </span>
                        </div>
                        <p style="margin: 0 0 20px;">
                            This OTP is valid for the next 10 minutes. Please do not share this OTP with anyone for security reasons.
                        </p>
                        <p style="margin: 0 0 20px;">
                            If you did not attempt to log in, please ignore this email.
                        </p>
                        <p style="margin: 0 0 20px;">
                            Sincerely,<br>
                            The Support Team
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; background-color: #eeeeee; color: #777777; font-size: 12px;">
                        <p style="margin: 0;">You received this email because you requested an OTP for logging in to your account.</p>
                        <p style="margin: 0;">If you didn’t make this request, please contact our support team immediately.</p>
                    </td>
                </tr>
            </table>
        </div>`;
    
        Html = htmlTemplate;
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
        text: message,
        html: Html,
        attachments: attachments,
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
