const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 5050
const morgan = require('morgan')

app.use(express.json())
app.use(cors())
app.use(morgan('combined'))

const MongoUrl = "mongodb://localhost:27017/taskphonebook"

mongoose.connect(MongoUrl)
.then(() => console.log("connected"))
.catch(() => console.log("not connected"))

const USerRoute = require('./Router/UserRouter')

app.use('/user', USerRoute)

app.use((err, req, res,next) => {
    const errmsg = err.stack || err.message

    console.error(errmsg)

    res.status(500).json({
        status : false,
        message : err.message
    })
})

process.on('uncaughtException', (err) => {
    console.error('uncaughtException', err)

    process.exit(1)
})

process.on('unhandledRejection', (err) => {
    console.error('unhandledRejection', err)

    process.exit(1)
})

app.listen(port, () => {
    console.log(`${port} is listning`)
})