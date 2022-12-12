const database = require('../model/database')

let get_all_author_stories = async(id) => {
    try {
        const query =  `SELECT `+
                            `* `+
                        `FROM `+
                            `post `+
                        `WHERE `+
                            `user_id = '${id}' `+
                        `ORDER BY `+
                            `id `+
                        `DESC `
                                            
    const result = await database(query)
    if(result){
        return result
    }  
    } catch (error) {
        return []
    }                       
}


let render_all_author_story =  async(req,res)=>{
    const {id} = req.params
    try {
       
        const all_author = await get_all_author_stories(id)
        if(all_author){
            return res.render('../view/author/all_author_story.ejs',{
                result:all_author,data:req.user,name:all_author[0]
            })
        }
    } catch (error) {
        return error
    }
}


module.exports = {
    render:render_all_author_story
}