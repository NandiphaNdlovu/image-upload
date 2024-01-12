//imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;//use another port number incase it fails to get the port number from .env variable

//middleware functions ***????       
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.use(session({secret: 'secret key', saveUninitialized: false, resave: false}))// what is this line doing here
app.use((req, res, next) =>{
    res.locals.message = req.session.message
    delete req.session.message
    next()
})
//set uploads as a static
app.use(express.static('uploads'))
//template engine
app.set('view engine', 'ejs')

/*remove
app.get('/', (req, res) => {//call back function that takes in request and response
    res.send('Hello There');
})
*/

//route prefix
app.use('',require('./routes/routes'))// takes care of all the routes

// database connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })//env connects to .env environment 
const db = mongoose.connection
db.on('error', (error) => {
    console.log(error)
})//if there is an error
db.once('open', () => {
    console.log('Connected to Database')
    app.listen(PORT, () => {
        console.log(`Server Started at http://localhost: ${PORT}`)
    })
})//if connection is successful using a call back function 
