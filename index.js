const express = require('express')
const morgan = require('morgan')
const cors = require("cors")
require('dotenv').config()

const db = require("./src/models/index")
db.sequelize.sync()

const clients = require('./src/routes/clients')
const credits = require('./src/routes/credits')
const products = require('./src/routes/products')
const purchases = require('./src/routes/purchases')
const users = require('./src/routes/users')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('dev'))

const corsOptions = {
    origin:'*', 
    credentials:true,        
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(clients)
app.use(credits)
app.use(products)
app.use(purchases)
app.use(users)

const PORT = process.env.PORT || 4111
app.listen(PORT, console.log("Server running at port : " + PORT))