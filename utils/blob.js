const {BlobServiceClient} = require('@azure/storage-blob');
const Readable = require('stream').Readable; 
require('dotenv').config();

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
async function sendToBlob(container,fileName,fileBuffer,type) {
    return new Promise(async (resolve, reject) => {
        try {
            const containerClient = blobServiceClient.getContainerClient(container);
            const blockBlobClient = containerClient.getBlockBlobClient(fileName);
            const blobOptions = { blobHTTPHeaders: { blobContentType: `${(type)?type:'application/octet-stream'}`} };
            const uploadBlobResponse = await blockBlobClient.upload(fileBuffer, fileBuffer.length, blobOptions);
            
            resolve(blockBlobClient)
        } catch (err) {
            reject(err.message)
        }
    })
}
async function deleteFileFromBlob(container, fileName) {
    return new Promise(async (resolve, reject) => {
        try {
            const containerClient = blobServiceClient.getContainerClient(container);
            const blockBlobClient = containerClient.getBlockBlobClient(fileName);
            const deleteBlobResponse = await blockBlobClient.delete();
            resolve(deleteBlobResponse);
        } catch (err) {
            
            reject(err.message);
        }
    });
}
async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on("data", (data) => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on("error", reject);
    });
}
async function bufferToStream(buffer) {
    return new Promise((resolve, reject) => {
        let stream = new Readable();
        stream.push(buffer);
        stream.push(null);
        resolve(stream);
    });
}
async function moveFile(container,fileName) {
    return new Promise(async (resolve, reject) => {
        try {
            const containerClient = blobServiceClient.getContainerClient(container);
            const blockBlobClient = containerClient.getBlockBlobClient(fileName);
            const downloadBlockBlobResponse = await blockBlobClient.download();
            const downloaded = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
            const destClient = containerClient.getBlockBlobClient("InvalidExcel/"+fileName);
            const uploadBlobResponse = await destClient.upload(downloaded, downloaded.length);
           const deleteBlob = await blockBlobClient.delete()
            resolve(deleteBlob)
        } catch (err) {
            
            reject(err.message)
        }
    })
}
async function getFileFromBlob(container,fileName) {
    return new Promise(async (resolve, reject) => {
        try{
            const containerClient = blobServiceClient.getContainerClient(container);
            const blockBlobClient = containerClient.getBlockBlobClient(fileName);
            const downloadBlockBlobResponse = await blockBlobClient.downloadToBuffer()
            
            // const downloaded = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody).catch(err=>reject(err.message))
            resolve(downloadBlockBlobResponse)
        }catch(err){
            
            reject(err.message)
        }
    })
}

async function createNewContainer(container) {
    return new Promise(async (resolve, reject) => {
        try {
            const containerClient = blobServiceClient.getContainerClient(container);
            const createContainerResponse = await containerClient.create();
            resolve(createContainerResponse)
        } catch (err) {
            resolve(false)
        }
    })
}

module.exports = {sendToBlob,getFileFromBlob,moveFile,streamToBuffer,createNewContainer,bufferToStream,deleteFileFromBlob}