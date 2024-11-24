// const schedule = require('node-schedule');
// const sendMails = require("./nodeSendMails");
// const dbQuery = require('../helpers/dbQuery.json')
// const CryptoJS = require("crypto-js");
// const format = require('./queryFormat')
// const dbrequest = require('./dbrequest')

// const updateActiveLmsUsers = schedule.scheduleJob('15 * * * * *', function () {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let formattedQuery = await format(dbQuery.students.sendMails);

//             let result = await dbrequest(formattedQuery).catch(e => {
//                 reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
//             })

//             if (result.length > 0) {
//                 if (result[0].source == "students") {
//                     await sendMails(result[0].EmailId, "LMS Login Credentials", `<style="color: black">
//                 Hello ${result[0].name},
//                 <br><br>    
//                 Welcome to Celebal Technologies COE Learning Management System!. <br>We are excited to have you onboard for this program and provide you with access to a wide array of industry approved learning resources aimed at enhancing your skills and knowledge across various domains.
//                 <br><br>
//                 To kickstart your learning journey, please use the following login credentials:<br>
//                 <strong>User ID:</strong> ${result[0].Id}<br>
//                 <strong>password:</strong> ${CryptoJS.AES.decrypt(result[0].password, process.env.secrete).toString(CryptoJS.enc.Utf8)}
//                 <br><br>
//                 Please login to portal via : <a href='https://ct-lms-coe-frontend-dev.azurewebsites.net/'>LMS Portal</a><br><br>
//                 As a security measure, we highly recommend updating your password therefore once logged in, navigate to change password option in your account settings.
//                 If you have any questions or require assistance while navigating the portal, our dedicated support team is just a click away. Feel free to reach out to us at ctlms@celebaltech.com
//                 <br><br>
//                 We look forward to seeing you thrive and succeed in your learning endeavors!
//                 </>                      
//                     `).then(async status=>{

//                         formattedQuery = await format(dbQuery.students.updateMailStatusStudent, result[0].EmailId);
//                         await dbrequest(formattedQuery).catch(e => {
//                             reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
//                         })
//                     }).catch(async e=>{
//                         formattedQuery = await format(dbQuery.students.updateMailStatusonRejectStudent, result[0].EmailId);
//                         await dbrequest(formattedQuery).catch(e => {
//                             reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
//                         })

//                     })
//                 }
//                 else if (result[0].source == "Faculty Mentor") {
//                     await sendMails(result[0].EmailId, "LMS Login Credentials", `<style="color: black">
//                 Hello ${result[0].name},
//                 <br><br>    
//                 Welcome to Celebal Technologies COE Learning Management System! <br>We are excited to have you onboard for this program.
//                 <br><br>
//                 To kickstart your journey, please use the following login credentials:<br>
//                 <strong>User ID:</strong> ${result[0].Id}<br>
//                 <strong>password:</strong> ${CryptoJS.AES.decrypt(result[0].password, process.env.secrete).toString(CryptoJS.enc.Utf8)}
//                 <br><br>
//                 Please login to portal via : <a href='https://ct-lms-coe-frontend-dev.azurewebsites.net/'>LMS Portal</a><br><br>
//                 As a security measure, we highly recommend updating your password therefore once logged in, navigate to change password option in your account settings.
//                 If you have any questions or require assistance while navigating the portal, our dedicated support team is just a click away. Feel free to reach out to us at ctlms@celebaltech.com
//                 <br><br>
//                 We look forward to seeing you thrive and succeed in your learning endeavors!
//                 </>                      
//                     `).then(async status=>{

//                         formattedQuery = await format(dbQuery.students.updateMailStatusonRejectFaculty, result[0].EmailId);
//                         await dbrequest(formattedQuery).catch(e => {
//                             reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
//                         })
//                     }).catch(async e=>{
//                         formattedQuery = await format(dbQuery.students.updateMailStatusonReject,'roles', result[0].EmailId);
//                         await dbrequest(formattedQuery).catch(e => {
//                             reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
//                         })

//                     })

                   
//                 }
//                 else if (result[0].source == "TPO") {
//                     await sendMails(result[0].EmailId, "LMS Login Credentials", `<style="color: black">
//                 Hello ${result[0].name},
//                 <br><br>    
//                 Welcome to Celebal Technologies COE Learning Management System! <br>We are excited to have you onboard for this program.
//                 <br><br>
//                 To kickstart your journey, please use the following login credentials to login to <a href=https://ct-lms-coe-frontend-dev.azurewebsites.net> LMS PORTAL <a>:<br>
//                 <strong>User ID:</strong> ${result[0].Id}<br>
//                 <strong>password:</strong> ${CryptoJS.AES.decrypt(result[0].password, process.env.secrete).toString(CryptoJS.enc.Utf8)}
//                 <br><br>
//                 Please login to portal via : <a href='https://ct-lms-coe-frontend-dev.azurewebsites.net/'>LMS Portal</a><br><br>
//                 As a security measure, we highly recommend updating your password therefore once logged in, navigate to change password option in your account settings.
//                 If you have any questions or require assistance while navigating the portal, our dedicated support team is just a click away. Feel free to reach out to us at ctlms@celebaltech.com
//                 <br><br>
//                 We look forward to seeing you thrive and succeed in your learning endeavors!
//                 </>                      
//                     `).then(async status=>{

//                         formattedQuery = await format(dbQuery.students.updateMailStatusTPO, result[0].EmailId);
//                         await dbrequest(formattedQuery).catch(e => {
//                             reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
//                         })
//                     }).catch(async e=>{
//                         formattedQuery = await format(dbQuery.students.updateMailStatusonRejectTPO, result[0].EmailId);
//                         await dbrequest(formattedQuery).catch(e => {
//                             reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
//                         })

//                     })

                    
//                 }
//             }
//         }
//         catch (error) {
//             // console.log(error)
//         }
//     })
// })