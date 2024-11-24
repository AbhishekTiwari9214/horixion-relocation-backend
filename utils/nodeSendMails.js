const nodemailer = require('nodemailer');
require('dotenv').config({ path: "../config.env" });

// const transporter = nodemailer.createTransport({
//     service: 'hotmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAILPASSWORD
//     }
// });

// Function for sending the mail via api/sendMails
async function sendMails(toEmail, sub, details, attachments) {    
    return new Promise(async (resolve, reject) => {
        try {
            const mailOptions = {
                from: `"Horixion Relocation" <${process.env.EMAIL}>`,
                to: toEmail,
                subject: sub,
                html: details, 
                attachments: attachments
            };
            transporter = await nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAILPASSWORD
                }
            });
            
            transporter.sendMail(mailOptions, (err, info) => {
                
                if (err) {
                    reject(err.message);
                } else {                    
                    resolve('Mail Delivered');
                } 
            });
        } catch (err) {
            // console.error(err.message);
            reject(err);
        }
    });
}

module.exports = sendMails;
