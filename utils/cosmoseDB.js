const { CosmosClient } = require("@azure/cosmos");


const cosmoseConnection = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const endpoint = process.env.COSMOS_ENDPOINT || process.env.COSMOS_KEY2
            const key = process.env.COSMOS_KEY

            const client = new CosmosClient({ endpoint, key });


            // Create a reference to your database and container
            const database = await client.database(process.env.DATABASE_ID);
            const container = await database.container(process.env.CONTAINER_ID);
            // const itemToInsert = {
            //     id: 'abhishek.tiwari2@celebaltech.com',
            //     data:[]
            // };

            // try {
            //     const { resource: createdItem } = await container.items.upsert(itemToInsert,  { contentType: "application/json" });

            // } catch (error) {
            //     console.error("Error creating document:", error);
            // }

            resolve({
                'container': container,
                message: 'cosmose db connected successfully'
            })

            return container

        } catch (error) {
            reject('there is a error in the connection of cosmose : ' + error)
        }

    })
}



// async function queryDocuments() {
//     const querySpec = {
//         query: "SELECT * FROM c",
//     };

//     const { resources: items } = await container.items.query(querySpec).fetchAll();

//   items.forEach(item => {

//   });
// }

// queryDocuments().catch((error) => {
//   console.error(error);
// });
async function saveMessage(newMessages) {
    // Retrieve the existing document
    const { resource } = await container.item("community_chat", "community_chat").read();

    // Check for duplicate messages using message IDs
    const existingMessageIds = new Set(resource.data.map(message => message.id));
    const uniqueNewMessages = newMessages.filter(message => !existingMessageIds.has(message.id));

    // Update the data array with the new messages
    resource.data = resource.data.concat(uniqueNewMessages);
    // Replace the entire document back into Cosmos DB
    await container.item("community_chat", "community_chat").replace(resource);

    // Remove saved messages from the arrayOfMessages
    const savedMessageIds = new Set(uniqueNewMessages.map(message => message.id));
    await setArrayOfMessages(savedMessageIds, "remove");
    console.log(`Messages saved in community_chat document.`);
}

module.exports = cosmoseConnection



