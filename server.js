require('dotenv').config()


const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const path = require('path')

const passport = require("passport")
const session = require('express-session')
const connect_flash = require('connect-flash')
const methodOverride = require('method-override')

app.use(session({
    secret: process.env.COOKIES,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

//template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './view'))
app.use(express.static(path.join(__dirname, '/public')))

//app.use(express.static("./upload/images"))
app.use('/user',express.static(path.join(__dirname,'upload/images')))
app.use('/user/dashboard/',express.static(path.join(__dirname,'upload/images')))
app.use('/post/read_post',express.static(path.join(__dirname,'upload/images')))
app.use('/post/author/all_stories/',express.static(path.join(__dirname,'upload/images')))
app.use('/post/author/all_stories/edit/',express.static(path.join(__dirname,'upload/images')))
app.use(express.static('./view/partials'))

//middleware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use(connect_flash());

app.use(passport.initialize());
app.use(passport.session());




//routes
const index = require('./routes/index')
const router = require('./routes/login')
const post = require('./routes/post')

app.use('/', index)
app.use('/user', router)
app.use('/post', post)


//port
const port = 3008
app.listen(port, () => {
    console.log("Listening at port: ", port)
})