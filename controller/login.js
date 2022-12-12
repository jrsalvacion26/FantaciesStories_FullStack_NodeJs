const database = require('../model/database')
const bcrypt = require('bcrypt')
const validator = require('express-validator')


let login_page = (req,res) => {
    
    return res.header('Cache-control', `no-store`).render('../view/login.ejs',{
        errors: req.flash("error")
    })
}
let handleIn = (email, password) => {   
    return new Promise(async(resolve, reject) => {
        let user = await findEmailUser(email)
        if(user){
            await bcrypt.compare(password, user.password).then((isMatch)=>{
                if(isMatch){
                    
                    resolve(true)
                }else{
                    reject(`The email or password that you've entered is incorrect`)
                }
            })
        }else{
            reject(`The email or password that you've entered is doesn't exist`)
        }
    })
   
}

let findEmailUser = async(email) => {
    try {
        const emails = 
                        `SELECT `+
                            `* `+
                        `FROM `+
                            `user `+
                        `WHERE `+
                            `email = '${email}' `
        const result = await database(emails)
        const user = result[0]
        return user
    } catch (error) {
        return error
    }
}

let findUserId= async(id) =>{
    try{
    const query =   `SELECT `+
                        `* `+
                    `FROM `+
                        `user `+
                    `WHERE `+
                        `id = '${id}' `
    
    const result = await database(query)
    const user = result[0]
    return user
    
    }catch(error){
        return []
    }
}

let comparePass = (password, userObject) => {
    return new Promise(async(resolve, reject) => {
        try {
            await bcrypt.compare(password,userObject.password).then((isMatch) => {
                if(isMatch){
                    
                    resolve(true)
                }else{
                    reject(`The email or password that you've entered is incorrect`)
                }
            })
            
        } catch (error) {
            reject(error)
        }
    })
}




let login = async(req,res) => {

    let errorsArr = [];
    let validationErrors = validator(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/user");
    }


    try {
        await handleIn(req.body.email, req.body.password);
        if(handleIn){
            return res.header('Cache-control', `no-store`, 'no-cache').redirect("/user/dashboard");
        }
        
    } catch (error) {
        req.flash("errors", error);
        return res.redirect("/user")
    }
}

let checkAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()){
       return res.redirect("/user")
    }
    next()
}
let checkNotAuthenticated = (req, res,next) => {
    if(req.isAuthenticated()){
      
        return res.header('Cache-control', `no-store`, 'no-cache').redirect('/user/dashboard')
    }
    next()
    
}

let postLogout = (req, res) => {
    
     req.session.destroy(function(err){

        return res.header('Cache-control', `no-store`, 'no-cache').redirect('/user')
    })
    

    
}

module.exports = {
    login_page:login_page,
    login:login,

    checkLogin:checkAuthenticated,
    checkLogout:checkNotAuthenticated,
    postLogout:postLogout,

    handleIn:handleIn,
    findUserId:findUserId,
    findEmailUser:findEmailUser,
    comparePass:comparePass
}