const { BlobServiceClient } = require("@azure/storage-blob");
const storage = require('azure-storage');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
var blobService = storage.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING);
// Azure connection
async function blobServiceConn() {                         // Connecting to Azure Storage Account
    return new Promise((resolve, reject) => {
        try {
                // <snippet_StorageAcctInfo>
                // const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

                // if (!AZURE_STORAGE_CONNECTION_STRING) {
                // throw Error("Azure Storage Connection string not found");
                // }
                // </snippet_StorageAcctInfo>
                // var blobService = storage.createBlobService(AZURE_STORAGE_CONNECTION_STRING);

                resolve(blobService)
            
        } catch (err) {
            reject('Failed to connect to a SQL Database connection.', err.message);
        }

    })

}
async function listFiles(container) {
    return new Promise(async (resolve, reject) => {
        try {
            // const containerClient = blobServiceClient.getContainerClient(container);
            // const blockBlobClient = containerClient.getBlockBlobClient(fileName);
            // const uploadBlobResponse = await blockBlobClient.upload(fileBuffer, fileBuffer.length);
            // resolve(uploadBlobResponse)
            blobService.listBlobsSegmented(container.split("_")[1].toLowerCase(), null, function(err, result) {
                resolve(result)
            })
        } catch (err) {
            reject(err.message)
        }
    })
}

async function uploadJSONtoBlob(container,blobName,content) {
    return new Promise(async (resolve, reject) => {
        try {
            // const containerClient = blobServiceClient.getContainerClient(container);
            // const blockBlobClient = containerClient.getBlockBlobClient(fileName);
            // const uploadBlobResponse = await blockBlobClient.upload(fileBuffer, fileBuffer.length);
            // resolve(uploadBlobResponse)
            blobService.createBlockBlobFromText(container,blobName,content, (error, result, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve('JSON file uploaded to Azure Blob Storage');
                }
            }); 
        } catch (err) {
            reject(err.message)
        }
    })
}

async function downloadJSONfromBlob(container,blobName) {
    return new Promise(async (resolve, reject) => {
        try {
            // const containerClient = blobServiceClient.getContainerClient(container);
            // const blockBlobClient = containerClient.getBlockBlobClient(fileName);
            // const uploadBlobResponse = await blockBlobClient.upload(fileBuffer, fileBuffer.length);
            // resolve(uploadBlobResponse)
            blobService.getBlobToText(container,blobName,(error, result, response) => {
                if (error) {
                    reject(error);
                } else {
                    let content = JSON.parse(result);
                    resolve(content);
                }
            }); 
        } catch (err) {
            reject(err.message)
        }
    })
}
module.exports = {blobServiceConn,listFiles,uploadJSONtoBlob,downloadJSONfromBlob}