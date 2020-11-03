const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const db = require('./config/db')
const routes = require('./routes')

const app = express()
db()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use("/api",routes)
app.listen('3333', function () {
    console.log('serverrunning')
})

