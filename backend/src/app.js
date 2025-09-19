const express = require('express')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const foodRouter = require('./routes/food.route');
const userRouter = require('./routes/user.route')

const app = express();
app.use(express.json())
app.use(cors())
app.use(cookieParser())


//api endpoints
app.use('/api/food', foodRouter)
app.use('/api/user', userRouter)


module.exports = app;