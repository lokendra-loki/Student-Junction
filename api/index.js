const cookieSession = require('cookie-session') // used to create a session
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const authRoute = require('./routes/auth')
const jobPostRoute = require('./routes/jobPost')
const blogRoute = require('./routes/blog')
const passport = require('passport')
const cors = require('cors')
const passportSetup = require('./passport')


//MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connection successful"))
    .catch((err) => console.log({ msg: "MongoDB connection error", err }))


//Middleware
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/jobPost", jobPostRoute)
app.use("/api/blog", blogRoute)



//Passport middleware
app.use(cookieSession({
    name: 'session',
    keys: ["loki"],
    maxAge: 24 * 60 * 60 * 100,  //1 day 
}
))
app.use(passport.initialize())
app.use(passport.session())
app.use(
    cors({
        origin: "http://localhost:3000", //client url
        methods: "GET, POST, PUT ,DELETE",
        credentials: true,
    })
)


//Post listening
app.listen(process.env.PORT, () => {
    console.log("Backend Server is running on port " + process.env.PORT);

})