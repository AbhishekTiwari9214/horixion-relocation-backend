
function failureResponse(status, message, statusCode, notificationMessage) {   //Common pattern for failure or invalid reponse
    return ({
       "statusCode": statusCode,
       "body": {
           "status": status,
           "message": message,
           "notificationMessage": notificationMessage? notificationMessage: undefined,
           "timestamp": Date()
       }        
   })
}

function successResponse(data, statusCode) {    //Common pattern for valid response 
   return ({
       "statusCode": statusCode,
       "body": {
           "data": data,
           "timestamp": Date()

       }
   })
}

module.exports = {
   failureResponse, successResponse
}