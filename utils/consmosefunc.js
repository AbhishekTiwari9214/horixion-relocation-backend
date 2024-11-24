const { indianTime } = require('./timezone')
const { organizeArray } = require('./simplefunctions')
const { connectRedis, redisCacheFetch, redisCacheStore } = require("./redisCacheConn");


const updatedata = async (container, roomId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { resource: items } = await container.item(roomId, roomId).read();
            let storedChats = await redisCacheFetch(`${roomId}`)
            if ((items?items.data.length:0) && (storedChats?JSON.parse(storedChats).length:0)) {
                items.data = [...items.data, ...JSON.parse(storedChats)]
                await container.items.upsert(items);
                await redisCacheStore(`${roomId}`, `[]`)
            }else if((storedChats?JSON.parse(storedChats).length:0) && (items?items.data.length==0?1:0:1) ){
                await container.items.upsert({ id: roomId, data:[...JSON.parse(storedChats)] });
                await redisCacheStore(`${roomId}`, `[]`)
            }
            resolve('appended Successfully')
            return;
        } catch (error) {
            console.error("Error appending chat to document:", error);
        }
    })
}

const fetchChats = async (container, roomId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let { resource: items } = await container.item(roomId, roomId).read();

            if (items) {

                items.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                // Keeping a single copy of "id" using a Set
                const uniqueIds = new Set();
                const uniqueMessages = items.data.filter((message) => {
                    if (!uniqueIds.has(message.id)) {
                        uniqueIds.add(message.id);
                        return true;
                    }
                    return false;
                });

                let nestedRes = await organizeArray(uniqueMessages)


                resolve({ message: { roomId: items.id, chats: nestedRes } })
            } else {
                await container.items.upsert({ id: roomId, data: [] });
                resolve({ message: { roomId: roomId, chats: [] } })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const addPerson = (container, person, uniqueid, key) => {

    return new Promise(async (resolve, reject) => {
        try {

            const querySpec = {
                query: `SELECT c.id,c.data FROM c where c.id='${uniqueid}'`,
            };
            const { resources: existingDocument } = await container.items.query(querySpec).fetchAll();

            if (existingDocument[0].data[`${key}`]) {
                resolve({ message: "previously uploaded" })
                return;
            }
            if (existingDocument.length > 0) {

                existingDocument[0].data = { ...existingDocument[0].data, ...person };
                await container.items.upsert(existingDocument[0]);
                resolve({
                    message: 'data inserted successfully'
                })
            } else {
                reject({
                    message: 'error while inserting the document'
                })
            }
        } catch (error) {
            reject({
                message: error.message
            })
        }
    }
    )
}


const updatePersonData = (container, documentId, email, nestedKey, newValue, onlyfetch) => {

    return new Promise(async (resolve, reject) => {
        try {
            const { resource } = await container.item(documentId, documentId).read();
            const existingDocument = resource || {};
            if (onlyfetch) {

                resolve({ message: existingDocument.data[`${email}`] })
                return
            }


            existingDocument.data[`${email}`][`${nestedKey}`] = [...existingDocument.data[`${email}`][`${nestedKey}`], newValue];

            await container.item(documentId, documentId).replace(existingDocument);
            resolve({ message: 'created successfully' })
        } catch (error) {
            reject({
                message: error.message
            })
        }
    })
}

const fetchpersondata = (container, documentId, email, nestedKey) => {

    return new Promise(async (resolve, reject) => {
        try {
            const querySpec = {
                query: `SELECT c.id,c.data['${email}']['${nestedKey}'] FROM c where c.id='${documentId}'`,
            };


            const { resources: nested } = await container.items.query(querySpec).fetchAll();

            resolve({
                message: nested[0][nestedKey]
            })
        } catch (error) {
            reject({
                message: error.message
            })
        }
    })
}

const general = async (container, documentId) => {
    let { resource } = await container.item(documentId, documentId).read();
    return resource
}
const addCourse = (container, documentId, arr, lp_name, sequence, collegeIds) => {

    return new Promise(async (resolve, reject) => {
        try {
            const existingDocument = await general(container, documentId);
            const collegeIdset = new Set(...collegeIds)
            let courseId = `${lp_name}00${sequence}`
            let data = { [courseId]: [] }
            await arr.map(async (item) => {
                existingDocument.data[`${item.emailId}`] = { ...existingDocument.data[`${item.emailId}`], ...data }
                await container.item(documentId, documentId).replace(existingDocument);
            })

            const weekunlocked = await general(container, 'week-unlock')
            for (i of collegeIdset) {

                weekunlocked.data[`${lp_name}_${i}`] = { ...weekunlocked.data[`${lp_name}_${i}`], ...data }

                await container.item('week-unlock', 'week-unlock').replace(weekunlocked);
            }

            resolve({ message: 'created successfully' })
        } catch (error) {
            reject({
                message: error.message
            })
        }
    })
}

const deleteUser = async (container, documentId, emailId) => {

    const querySpec = {
        query: `SELECT c.id,c.data FROM c where c.id='${documentId}'`,
    };
    const { resources: items } = await container.items.query(querySpec).fetchAll();
    let item = items[0]
    delete item.data[emailId]
    await container.items.upsert(item);
    return 'delete successfully'

}
let markAsDone = (container, emailId, obj, fetch) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { resource: document } = await container.item(emailId, emailId).read();
            // Append the new object to the 'data' array

            if (document) {

                if (fetch) {
                    resolve({ message: document.data })
                    return

                }

                document.data.push(obj);
            } else {
                if (fetch) {
                    resolve({ message: [] })

                    return;
                }

                document = {}
                document.id = emailId
                document.data = [obj];
            }

            // Update the document with the modified 'data' array
            await container.items.upsert(document);
            resolve({
                message: "data inserted successfully"
            })
        } catch (error) {
            reject({ message: error.message });
        }
    })
}


module.exports = { updatedata, fetchChats, addPerson, updatePersonData, fetchpersondata, addCourse, deleteUser, markAsDone }



