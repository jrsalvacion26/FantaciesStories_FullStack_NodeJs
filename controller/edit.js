
const database = require('../model/database')
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null,"upload/images")
    },
    filename:(req, file,cb)=> {
        
        cb(null,file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})


const upload = multer({
    storage:storage,
})

let update_query = async(id,title,image,paragraph) => {
 try {
    const query = 
                    `UPDATE `+
                        `post `+
                    `SET `+
                        `title = '${title}', `+
                        `image = '${image}', `+
                        `paragraph = '${paragraph}' `+
                    `WHERE `+
                        `id = '${id}' `

    
    await database(query)
    return true
 } catch (error) {
    return error
 }
}

let value_update = async(id) => {
    try{
        const value_query =     `SELECT `+
                                    `* `+
                                `FROM `+
                                    `post `+
                                `WHERE `+
                                    `id = '${id}' `
    
    const values = await database(value_query)
    if(values){
        
        return values
    }                         
    
    }catch (error){
        return error
    }                           
}


let render_edit = async(req,res) => {
    const {id} = req.params

    try {
        const update_story = await value_update(id)
        if(update_story){
            return res.render('../view/author/edit.ejs',{
                update:update_story[0]
            })
        }
        
    } catch (error) {
        return error
    }
}

let update_edit = async(req,res) => {


    
    const {id, title,paragraph} = req.body
    const image = req.file.filename

    let new_image = ""
    
    try {
        
        
        const edit_now = await update_query(id,title,image,paragraph)

        if(edit_now){
            
            return res.redirect('/post/author/')
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    render:render_edit,
    update:update_edit,
    upload
}