const { connectRedis, redisCacheFetch, redisCacheStore } = require("./redisCacheConn");
async function chatconfig(container, msg) {
    // console.log(msg, 'before insertion');
    return new Promise(async (resolve, reject) => {
        try {
            // let { resource: document } = await container.item(msg.roomId, msg.roomId).read();
            let message = {
                id: Date.now(),
                timestamp: new Date().toISOString(msg.timestamp),
                message: msg.message,
                name: msg.name,
                mailId: msg.mailId,
                pid: msg.pid,
                profile: msg.profile,
                repliedToEmail: msg.repliedToEmail,
                repliedToName: msg.repliedToName,
            }
            let fetch = await redisCacheFetch(`${msg.roomId}`).catch(e => {
            })
            arrayOfMessages = fetch ? JSON.parse(fetch) : [];
            arrayOfMessages.push(message)
            await redisCacheStore(`${msg.roomId}`, JSON.stringify(arrayOfMessages))

            resolve({
                message: message
            })

        } catch (error) {
            reject({ message: error.message })
        }
    })
}
module.exports = chatconfig