const database = require('../model/database')


let author_query = async(id)=>{

    try {
        const query =   `SELECT `+
                            `count('post.id') as Counts,post.user_id ,user.name `+
                        `FROM `+
                            `post `+
                        `LEFT JOIN `+
                            `user `+
                        `ON `+
                            `user.id = post.user_id `+
                        `GROUP BY `+
                            `user.name `

                        
                                
                    
    
        const result = await database(query)
        if(result){
            
            return result
        }
        
    } catch (error) {
        
        return []
    }

    

}

let render_author = async(req,res) => {
    const {id} = req.params
    try {
        const results = await author_query(id)
        const count = results[0]
        
        if(results){
           
            return res.render('../view/author/author.ejs',{
                datas:results,
                data:req.user,
                id:results[0]
                
            })
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    render:render_author
}