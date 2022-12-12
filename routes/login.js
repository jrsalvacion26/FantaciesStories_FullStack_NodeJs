const express = require('express')

const router = express.Router()

const landingPage = require('../controller/landing')
const registerPage = require('../controller/register')
const login = require('../controller/login')
//const landing_page = require('../controller/landingPage')
const render_post = require('../controller/post')
const initpassport = require('../controller/passport-config')
const passport = require('passport')
initpassport()


//const render_post_stories = require('../controller/landing')

//console.log(upload)

//router.get('/read_post/:id', render_post_stories.render)


router.get('/',login.checkLogout, login.login_page)
router.post("/", passport.authenticate("local", {
    successRedirect:'/user/dashboard',
    failureRedirect:'/user',
    successFlash:true,
    failureFlash:true
}))

router.get('/dashboard',login.checkLogin,landingPage.renderPage)
router.post('/dashboard/',login.checkLogin,landingPage.search)


router.get('/register',login.checkLogout, registerPage.register_page)
router.post('/user/register', registerPage.user_routes)


router.delete('/logout',login.postLogout)

module.exports = router