const mongoose = require('mongoose');

const connectMongoDB = async () => {
return new Promise (async(resolve, reject)=>{
    try {
await mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(stauts=>{
            resolve({message: 'MongoDB connected'})
        }).catch(e=>{
            reject({message: `unable to connect due to : ${e.message}`})
        })
        
    } catch (error) {
        reject({message: `Something went wrong in connect mongodb: ${error.message}`});
    }
})
};

module.exports = connectMongoDB;
