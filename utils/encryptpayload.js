const crypto = require('crypto');
const CryptoJS = require('crypto-js');

const generateIV = () => crypto.randomBytes(16);
const encryptPayload = (payload, secretKey) => {
  const iv = generateIV();
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
  let encryptedPayload = cipher.update(payload, 'utf-8', 'hex');
  encryptedPayload += cipher.final('hex');
  return { iv: iv.toString('hex'), payload: encryptedPayload };
};

// Decrypt the payload using AES-256-CBC algorithm
const decryptPayload = (encryptedPayload, secretKey, ivFromHeaders) => {
  try {       // Convert IV and encrypted payload to WordArray  
   
    const iv = CryptoJS.enc.Base64.parse(ivFromHeaders);
    const encryptedData = CryptoJS.enc.Base64.parse(encryptedPayload);
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedData }, secretKey, { iv });

    const decryptedPayload = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

    return decryptedPayload;
  } catch (error) {
    console.error('Decryption failed:', error.message);
    return null;
  }
}

//   const iv = CryptoJS.enc.Base64.parse(ivFromHeaders);
//   const encryptedData = CryptoJS.enc.Base64.parse(encryptedPayload);     
//   const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedData }, secretKey, { iv });     
//   const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
// const decryptedObject = JSON.parse(decryptedText);
//   console.log(decrypted);
//   return decrypted;

// }
function decrypttoken(encstring) {

  const secretKey = process.env.REACT_APP_KEY;

  const decrypted = CryptoJS.AES.decrypt(encstring, secretKey).toString(CryptoJS.enc.Utf8);
  return decrypted
}


module.exports = { encryptPayload, decryptPayload, decrypttoken }