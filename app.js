const app = require('express')()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Connect to Mongoose
mongoose.connect(process.env.DB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Connected to MongoDB")
    }).catch(err => {
        console.log(err.message)
    })

//importing Routes
const homeRoute = require('./routes/home')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')


//Using Routes
app.use('/api', homeRoute)
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)




//Spin up the dev server
let port = process.env.port || 3000
app.listen(3000, () => {
    console.log(`App is running on port ${port}`)
})
