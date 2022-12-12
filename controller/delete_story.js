const database = require('../model/database')

let delete_query = async(id) => {

    try {
        const query =   `DELETE `+
                        `FROM `+
                            `post `+
                        `WHERE `+
                            `id = ${id} `
        
    return await database(query)

    } catch (error) {
        return error
    }
    
}

let delete_story = async(req,res) => {
    try {
        const {id} = req.params
        const deletes = await delete_query(id)

        if(deletes){
            return res.redirect('/post/author/')
        }
    } catch (error) {
        return error
    }
}


module.exports ={
    delete:delete_story
}