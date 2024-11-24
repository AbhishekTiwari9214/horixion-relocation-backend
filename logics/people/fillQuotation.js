const mongoose = require('mongoose')
const FillQuotation = require('../../models/FillQuotation')
const sendMails = require('../../utils/nodeSendMails')


const fillQuotation = (name, emailId, movingFrom, movingTo, phone, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fillQuotationDetail = new FillQuotation({
                name: name,
                emailId: emailId,
                phone: phone,
                movingFrom: movingFrom,
                movingTo: movingTo,
                message: message,
            })
            await fillQuotationDetail.save()
            let htmlDetail = `<b>moving quotation form filled by Someone: </b> </p> <br> <b>Name: </b>${name}
            <br> <b>Email:</b> ${emailId} <br> <b>Phone:</b> ${phone} <br>  <b>Moving From:</b> ${movingFrom} <br> <b>Moving To:<b> </b> ${movingTo} <br> <b>Message: </b>${message}`
            await sendMails('abhishektiwari9214@gmail.com,shiv93149@gmail.com', `quotation form filled by ${name} for moving`, htmlDetail)
            let htmlDetailForPerson = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Your Query Has Been Successfully Raised</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td>
                                <p>Dear <strong>${name}</strong>,</p>

                                <p>Thank you for reaching out to us. We wanted to let you know that we have successfully received your form, and our team is currently working on it.</p>

                                <p>We will Contact you for the Quotation.</p>

                                <p>We appreciate your patience and look forward to assisting you.</p>

                                <p>Best regards,</p>

                                <p><strong>Horixion Relocation</strong><br>

                                <a href="mailto:horixionrelocation@gmail.com">horixionrelocation@gmail.com</a><br>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
                `
            await sendMails(emailId, 'Form filled Successfully', htmlDetailForPerson)
            resolve({ status: 'OK', message: 'Form Submitted Successfully We will you contact as soon as possible' })

        } catch (error) {
            reject({
                status: 'INTERNAL_SERVER_ERROR',
                message: error.message
            })
        }
    })
}
module.exports = fillQuotation