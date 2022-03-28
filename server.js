// environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// require packages
const express = require('express')
const expressLayouts = require('express-ejs-layouts')

// create app
const app = express()
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

// use packages
app.use(express.static('public'))
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(expressLayouts)

// database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// blueprints
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000)