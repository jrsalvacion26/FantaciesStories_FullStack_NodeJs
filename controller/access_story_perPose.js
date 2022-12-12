const database = require('../model/database')

let read_post_query = async(id) => {
    try {
        const query = 
                        `SELECT `+
                            `title, image, paragraph `+
                        `FROM `+
                            `post `+
                        `WHERE `+
                            `id = '${id}' `
                
        const result = await database(query)
        
        return result
    } catch (error) {
        
        return error
    }
}


let render_post_stories = async(req,res) => {


    try {
        const {id} = req.params
        const view_story = await read_post_query(id)
        
        if(view_story){
            
            return res.render('../view/post/render_post.ejs',{
                result:view_story[0],
                data: req.user
            })
        }else{
            res.status('404')
        }
    } catch (error) {
        return error
    }
    
}

module.exports = {
    render:render_post_stories
}