const schedule = require('node-schedule');
const dbQuery = require('../helpers/dbQuery.json')
const format = require('./queryFormat')
const dbrequest = require('./dbrequest')
const sendMails = require("./nodeSendMails");
const CryptoJS = require("crypto-js");
const { getArrayOfMessages, saveMessage } = require('../index');
const { getWeekDifference } = require('./timezone');
const updateActiveLmsUsers = schedule.scheduleJob('15 * * * * *', function () {
    return new Promise(async (resolve, reject) => {
        try {
            let formattedQuery = await format(dbQuery.students.sendMails);
            let result = await dbrequest(formattedQuery).catch(e => {
                reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
            })
            if (result.length > 0) {
                if (result[0].source == "students") {
                    await sendMails(result[0].EmailId, "LMS Login Credentials", `<style="color: black">
                Hello ${result[0].name},
                <br><br>    
                Welcome to Celebal Technologies COE Learning Management System! <br>We are excited to have you onboard for this program and provide you with access to a wide array of industry approved learning resources aimed at enhancing your skills and knowledge across various domains.
                <br><br>
                To kickstart your learning journey, please use the following login credentials:<br>
                <strong>User ID:</strong> ${result[0].Id}<br>
                <strong>password:</strong> ${CryptoJS.AES.decrypt(result[0].password, process.env.secrete).toString(CryptoJS.enc.Utf8)}
                <br><br>
                As a security measure, we highly recommend updating your password therefore once logged in, navigate to change password option in your account settings.
                If you have any questions or require assistance while navigating the portal, our dedicated support team is just a click away. Feel free to reach out to us at ctlms@celebaltech.com
                <br><br>
                We look forward to seeing you thrive and succeed in your learning endeavors!
                </>                      
                    `);
                    formattedQuery = await format(dbQuery.students.updateMailStatus, result[0].EmailId);
                    await dbrequest(formattedQuery).catch(e => {
                        reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
                    })
                }
                else if (result[0].source == "Faculty Mentor") {
                    await sendMails(result[0].EmailId, "LMS Login Credentials", `<style="color: black">
                Hello ${result[0].name},
                <br><br>    
                Welcome to Celebal Technologies COE Learning Management System! <br>We are excited to have you onboard for this program.
                <br><br>
                To kickstart your journey, please use the following login credentials:<br>
                <strong>User ID:</strong> ${result[0].Id}<br>
                <strong>password:</strong> ${CryptoJS.AES.decrypt(result[0].password, process.env.secrete).toString(CryptoJS.enc.Utf8)}
                <br><br>
                As a security measure, we highly recommend updating your password therefore once logged in, navigate to change password option in your account settings.
                If you have any questions or require assistance while navigating the portal, our dedicated support team is just a click away. Feel free to reach out to us at ctlms@celebaltech.com
                <br><br>
                We look forward to seeing you thrive and succeed in your learning endeavors!
                </>                      
                    `);
                    formattedQuery = await format(dbQuery.collegeMentor.updateMailStatus, result[0].EmailId);
                    await dbrequest(formattedQuery).catch(e => {
                        reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
                    })
                }
                else if (result[0].source == "TPO") {
                    await sendMails(result[0].EmailId, "LMS Login Credentials", `<style="color: black">
                Hello ${result[0].name},
                <br><br>    
                Welcome to Celebal Technologies COE Learning Management System! <br>We are excited to have you onboard for this program.
                <br><br>
                To kickstart your journey, please use the following login credentials to login to <a href=https://ct-lms-coe-frontend-dev.azurewebsites.net> LMS PORTAL <a>:<br>
                <strong>User ID:</strong> ${result[0].Id}<br>
                <strong>password:</strong> ${CryptoJS.AES.decrypt(result[0].password, process.env.secrete).toString(CryptoJS.enc.Utf8)}
                <br><br>
                As a security measure, we highly recommend updating your password therefore once logged in, navigate to change password option in your account settings.
                If you have any questions or require assistance while navigating the portal, our dedicated support team is just a click away. Feel free to reach out to us at ctlms@celebaltech.com
                <br><br>
                We look forward to seeing you thrive and succeed in your learning endeavors!
                </>                      
                    `);
                    formattedQuery = await format(dbQuery.TPO.updateMailStatus, result[0].EmailId);
                    await dbrequest(formattedQuery).catch(e => {
                        reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
                    })
                }
            }
        }
        catch (error) {
            // console.log(error)
        }
    })
})
// const updateCosmosForCommunityChat = schedule.scheduleJob('15 * * * * *', function () {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let prevArrayOfMessages = await getArrayOfMessages();
//             // console.log(prevArrayOfMessages, Date.now())
//             if (prevArrayOfMessages.length > 0)
//                 await saveMessage(prevArrayOfMessages);
//             resolvex("Done");
//         } catch (error) {
//             reject(error);
//         }
//     });
// });
const leaderBoard = schedule.scheduleJob('0 0 * * 0', function () {
    return new Promise(async (resolve, reject) => {
        try {
            // await dbrequest("TRUNCATE TABLE leaderboard.data").catch(e => {
            //     reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
            // })
            let formattedQuery = await format(dbQuery.students.getStudentDetail);
            let result = await dbrequest(formattedQuery).catch(e => {
                reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
            })
            // let distinct
            for (let i = 0; i < result.length; i++) {
                let percentile = 0;
                //find out which week is it
                let week = getWeekDifference(new Date(result[i].cStartDate), new Date()) + 1
                //timesheet percentile calculation
                formattedQuery = await format(dbQuery.students.getTimesheetPercentile, result[i].EmailId, week);
                let timesheets = await dbrequest(formattedQuery).catch(e => {
                    reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
                })
                if (timesheets.length) {
                    let onTimeTimeSheets = 0;
                    for (let j = 0; j < timesheets.length; j++) {
                        if (timesheets[j].submitted == 1 && timesheets[j].taskDate && timesheets[j].filledOn) {
                            let taskDate = new Date(timesheets[j].taskDate);
                            let filledOn = new Date(timesheets[j].filledOn);
                            // Check if dates have the same date and year
                            if (
                                taskDate.getDate() === filledOn.getDate() &&
                                taskDate.getMonth() === filledOn.getMonth() &&
                                taskDate.getFullYear() === filledOn.getFullYear()
                            ) {
                                onTimeTimeSheets += 1;
                            }
                        }
                    }
                    percentile = onTimeTimeSheets / timesheets.length;
                }
                //course assignment percentile calculation
                formattedQuery = await format(dbQuery.students.getTaskDetailPercentile, result[i].EmailId, week);
                let tasks = await dbrequest(formattedQuery).catch(e => {
                    reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
                })
                let assignmentUploadedOn = null;
                let taskPercentile = 0;
                if (tasks.length) //there will be only on for one week
                {
                    taskPercentile =
                        (tasks[0].adherenceMentor) ? parseInt(tasks[0].adherenceMentor) : 0 +
                            (tasks[0].problemSolvingMentor) ? parseInt(tasks[0].problemSolvingMentor) : 0 +
                                (tasks[0].workQualityMentor) ? parseInt(tasks[0].workQualityMentor) : 0 +
                                    (tasks[0].creativityMentor) ? parseInt(tasks[0].creativityMentor) : 0 +
                                        (tasks[0].adherenceFacultym) ? parseInt(tasks[0].adherenceFacultym) : 0 +
                                            (tasks[0].problemSolvingFacultym) ? parseInt(tasks[0].problemSolvingFacultym) : 0 +
                                                (tasks[0].workQualityFacultym) ? parseInt(tasks[0].workQualityFacultym) : 0 +
                                                    (tasks[0].creativityFacultym) ? parseInt(tasks[0].creativityFacultym) : 0
                    taskPercentile = taskPercentile / 8;
                    assignmentUploadedOn = new Date(tasks[0].uploadedOn).toISOString();
                }
                //calculate total average
                percentile = (((percentile + taskPercentile) / 2) * 100).toFixed(2);
                //Update the database with the percentile
                //emailId,studentName,score,domain,collegeName,week
                formattedQuery = await format(dbQuery.students.updateLeaderboardData, result[i].EmailId, result[i].studentName, percentile, result[i].domain, result[i].collegeName, week, assignmentUploadedOn, result[i].collegeId);
                await dbrequest(formattedQuery).catch(e => {
                    reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
                })
            }
            formattedQuery = await format(dbQuery.students.updateLeaderboardRank);
            await dbrequest(formattedQuery).catch(e => {
                reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
            })
        } catch (error) {
            reject(error);
        }
    });
});
const drippingModel = schedule.scheduleJob('0 0 * * 0', function () {
    return new Promise(async (resolve, reject) => {
        try {
            // formattedQuery = await format(dbQuery.officeAdmin.UpdateStudentDrippedStatus,4,1);
            // await dbrequest(formattedQuery).catch(e => {
            //     reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
            // })
            formattedQuery = await format(dbQuery.officeAdmin.UpdateStudentDrippedStatus,7,2);
            await dbrequest(formattedQuery).catch(e => {
                reject({ status: 'INTERNAL_SERVER_ERROR', message: e })
            })
        } catch (error) {
            reject(error);
        }
    });
});