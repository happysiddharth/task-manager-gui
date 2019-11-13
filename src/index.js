const express = require('express')
const hbs = require('hbs')
const path = require('path')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const cookieParser = require('cookie-parser'); 

//const publicDirectoryPath = path.join(__dirname, '../public')

const app = express()
const port = process.env.PORT


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.use(express.urlencoded())
app.use(cookieParser()); 
app.use(userRouter)
app.use(taskRouter)

app.get('', (req, res) => {
    res.render('login', {
        title: 'Login',
        name: 'Siddharth Kaushik'
    })
})
app.get('/signup', (req, res) => {
    res.render('signup', {
        title: 'Signup',
        name: 'Siddharth Kaushik'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})