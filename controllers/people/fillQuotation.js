const fillQuotationLogic = require('../../logics/people/fillQuotation')
const { failureResponse, successResponse } = require('../../utils/responseSchema')
const statusCode = require('../../utils/stausCodes.json')
const fillQuotation = async (req, res) => {
    try {
        const name = req.body.name;
        const emailId = req.body.emailId;
        const movingFrom = req.body.movingFrom;
        const movingTo = req.body.movingTo;
        const phone = req.body.phone;
        const message = req.body.message;        
        await fillQuotationLogic(name,emailId,movingFrom,movingTo, phone, message).then(data => {
            let successresponse = successResponse(data.message, statusCode[data.status].statusCode)
            res.status(successresponse.statusCode).json(successresponse.body)
        }).catch(e => {
            let failureresponse = failureResponse(e.status, e.message, statusCode[e.status].statusCode)
            res.status(failureresponse.statusCode).json(failureresponse.body)
        })
    } catch (error) {
        let failureresponse = failureResponse(statusCode['INTERNAL_SERVER_ERROR'], error.message, 500)
        res.status(failureresponse.statusCode).json(failureresponse.body)
    }
}
module.exports = fillQuotation