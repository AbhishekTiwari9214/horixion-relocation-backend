const { resolve } = require("path");
var redis = require("redis");
require('dotenv').config();
// Connect to the Azure Cache for Redis over the TLS port using the key.
var cacheHostName = process.env.REDISCACHEHOSTNAME;
var cachePassword = process.env.REDISCACHEKEY;
var cacheConnection = redis.createClient({
    // rediss for TLS
    url: "rediss://" + cacheHostName + ":6380",
    password: cachePassword,
});
async function connectRedis()
{
    return new Promise(async (resolve, reject) => {
        try
        {
            await cacheConnection.connect();
            resolve("Redis Connected")
        }
        catch(err)
        {
            reject("Failed to connect to redis cache", err.message)
        }
    })  
}
function redisCacheFetch(key)
{
    return new Promise(async(resolve, reject) => {
        try
        {

            resolve(await cacheConnection.get(key));   
        }
        catch(err)
        {
            reject("Failed to connect to redis cache", err.message)
        }
    })
}
function redisCacheStore(key,value)
{
    return new Promise(async(resolve, reject) => {
        try
        {
            // let value = JSON.stringify([{name:"SJ",age:12},{name:"SJ",age:12},{name:"SJ",age:12}])
            
               resolve(await cacheConnection.set(key,value));            
           
        }
        catch(err)
        {
            reject("Failed to connect to redis cache", err.message)
        }
    })
}

module.exports = {connectRedis,redisCacheFetch,redisCacheStore}
// module.exports = {connectRedis,cacheConnection}


