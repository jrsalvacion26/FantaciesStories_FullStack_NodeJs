const database = require('../model/database')
const bcrypt = require('bcrypt')

let register_user = async(name,email,password) => {
    try {
        
        const hashePassword = bcrypt.hashSync(password,10)
        const query = 
                        `INSERT INTO `+
                            `user `+
                        `VALUES `+
                            `(null,'${name}','${email}','${hashePassword}') `
        
        const result = await database(query)
        return result

    } catch (error) {
        return error
    }
}


let user_routes = async(req,res) => {
    const {name,email,password} = req.body
    try {
       
        
        const results = await register_user(name,email,password)
        if(results){
            return res.redirect('/user')
        }else{
            return res.redirect('/register')
        }
    } catch (error) {
        return error
    }
}

let register_page = (req,res) => {
    return res.render('../view/register.ejs')
}

module.exports = {
    register_page:register_page,
    user_routes:user_routes
}