const express = require('express')
const router = express.Router()
//const login = require('../controller/login')
const landing_page = require('../controller/landingPage')
//const initpassport = require('../controller/passport-config')

//const landingPage = require('../controller/landing')
const registerPage = require('../controller/register')
const login = require('../controller/login')
//const landing_page = require('../controller/landingPage')




router.get('/',login.checkLogout, landing_page.landing_page)


module.exports = router