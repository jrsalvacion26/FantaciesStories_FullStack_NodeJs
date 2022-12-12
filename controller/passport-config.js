const database = require('../model/database')
const bcrypt = require('bcrypt')
const passport = require('passport')
const passportLocal = require('passport-local')
const login_controller = require('../controller/login')




let localStrategy = passportLocal.Strategy

let initPassportLocal = () => {
    passport.use(new localStrategy ({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },
    async (req, email,password,done)=>{
        try {
            await login_controller.findEmailUser(email).then(async (user) => {
                if (!user) {
                    return done(null, false, req.flash("errors", `The email or password that you've entered is doesnt exist`));
                }
                if (user) {
                    let match = await login_controller.comparePass(password, user);
                    if (match === true) {
                 
                        return done(null, user, null)
                    } else {
                
                        return done(null, false, req.flash("errors", match))
                    }
                }
            });
        } catch (err) {

            return done(null, false, { message: err });
        }
    }))
}

passport.serializeUser(function(user, done){
    done(null,user.id)
})

passport.deserializeUser(async function (id,done){
    await login_controller.findUserId(id).then((user) => {
        return done(null,user)
    }).catch(error => {
        return done(error,null)
    })
})


module.exports = initPassportLocal