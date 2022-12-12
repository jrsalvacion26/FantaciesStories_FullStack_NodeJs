const database = require('../model/database')

const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null,"upload/images")
    },
    filename:(req, file,cb)=> {
        console.log(file)
        cb(null,file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})


const upload = multer({
    storage:storage,
})

let render_post = (req,res) => {
    return res.render('../view/post/post.ejs',{
        data:req.user
    })
}

let post_query= async(user_id, title,image,paragraph) =>{
    
    

    try{
        const query =   `INSERT `+
                            `post `+
                        `VALUES `+
                            `(null, '${user_id}','${title}','${image}','${paragraph}') `
    
    await database(query)
    
    console.log(query)
    return true
    
    }catch(error){
        return error
    }
}




let post_user = async(req,res) => {
    const {user_id, title,paragraph} = req.body

    const image = req.file.filename

    try {
        
        const user = await post_query(user_id, title,image,paragraph)
        
        
        if(user){
            return res.redirect('/user')
        }else{
            return res.redirect('/post')
        }
        
    } catch (error) {
        return error
    }
}

module.exports = {
    render_post:render_post,
    post_user:post_user,
    upload
}