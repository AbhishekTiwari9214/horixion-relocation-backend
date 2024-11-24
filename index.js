const express = require('express')
const app = express()
const dotenv = require('dotenv')
const { people,admin } = require('./routes/index')
const cors= require('cors')
const connectMongoDB = require('./utils/mongoConnection')
app.use(express.json());
dotenv.config({ path: 'config.env' })
PORT = process.env.PORT || 9000
app.get('/', (req, res) => {
    res.json({ message: 'hello from the server', status: 200 })
})

app.use('/api', people)

connectMongoDB().then((status) => {
    console.log(status.message)
    app.listen(PORT, () => {
        console.log(`your server is running on the site: http://localhost:${PORT}`)
    })
}).catch(e => {
    console.log(e.message)
})

