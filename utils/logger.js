const winston = require('winston');
const { AzureApplicationInsightsLogger } = require('winston-azure-application-insights');
const appInsights = require('applicationinsights');

const apiLogger = (
    requestOption,
    apiResult
  ) => {
    appInsights.setup("ce6cbd17-8703-42ea-a633-f089b1c7f8b5").start();
    appInsights.defaultClient.trackEvent({
      name: "APIlogger",
      properties: {
        Time: new Date().toISOString(),
  
        RequestEndpoint: requestOption.endPoint,
  
        RequestBody: requestOption.requestBody,
  
        API_Name: requestOption.apiName,
  
        API_Response: apiResult,
      },
    });
  
  
  
    logClient = null;
  };
  
// Export the logger instance
module.exports = apiLogger;
