const e = require('connect-flash')
const database = require('../model/database')


let show_post_query = async(limit, offset)=> {
    try {
        const query =   `SELECT `+
                            `id,image,title `+
                        `FROM `+
                            `post `+
                        `ORDER BY `+
                            `id `+
                        `DESC `+
                        `LIMIT `+
                            `${limit} `+
                        `OFFSET `+
                            `${offset} `
                        

                            
        const result = await database(query)
        return result
    } catch (error) {
        return []
    }
}

let length_page = async()=> {
    try {
        const query =   `SELECT `+
                            `* `+
                        `FROM `+
                            `post `


                            
        const result = await database(query)
        
        return result
    } catch (error) {
        return []
    }
}



let search_post_query = async(title)=> {
    try {
        const query =   `SELECT `+ 
                            `id,title,image `+
                        `FROM `+
                            `post `+
                        `WHERE `+
                            `title `+ 
                        `LIKE `+
                            `'%${title}%' `
                            
                        
    
        const result = await database(query)
        
        return result
    } catch (error) {
        return []
    }
}



let show_post = async(req,res)=>{
    try {
        let page = req.query.page ? Number(req.query.page) : 1;

        const all_data = await length_page()
        const length = all_data.length
        const Pages = 6
        const itemsPerPage = Math.ceil(length/Pages)

        if(page > itemsPerPage){
            return res.redirect('/?page='+encodeURIComponent(itemsPerPage));
            
        }else if(page < 1){
            return res.redirect('/?page='+encodeURIComponent('1'));
            
        }


        const limit = Pages
       

        const offset = (page - 1) * Pages
        const results = await show_post_query(limit, offset)
        
        const {title} = req.query
        
        const search = await search_post_query(title)
    
        if(results && search){
            let iterator = (page - 1) < 1 ? 1 : page - 1
            
            let endingLink = (iterator + 11) <= itemsPerPage ? (iterator + 11) : page + (itemsPerPage - page);
            if(endingLink < (page + 2)){
                iterator -= (page + 1) - itemsPerPage;
            }

            return res.render('../view/dashboard.ejs',{
                result:results,
                data:req.user,
                itemsPerPage,
                endingLink,
                iterator,
                page

                //search:search
               })
          }
    } catch (error) {
        return error
    }
}


let search_q = async(req,res)=>{
    
    try {
        const {title} = req.body
       
        //const retrieve = await show_post_query()
        const search = await search_post_query(title)
        const all_data = await length_page()
        const length = all_data.length
        const Pages = 6
        const itemsPerPage = Math.ceil(length/Pages)

        let page = req.query.page ? Number(req.query.page) : 1;


        if(page > itemsPerPage){
            return res.redirect('/?page='+encodeURIComponent(itemsPerPage));
            
        }else if(page < 1){
            return res.redirect('/?page='+encodeURIComponent('1'));
            
        }

        const limit = Pages


        const offset = (page - 1) * Pages

        const results = await show_post_query(limit, offset)
    
        if(search && results){
            let iterator = (page - 1) < 1 ? 1 : page - 1
            
            let endingLink = (iterator + 11) <= itemsPerPage ? (iterator + 11) : page + (itemsPerPage - page);
            if(endingLink < (page + 2)){
                iterator -= (page + 1) - itemsPerPage;
            }
                return res.render('../view/dashboard.ejs',{
                //result:retrieve,
                result:search,
                data:req.user,
                itemsPerPage,
                endingLink,
                
                page
                
               })
          }
            //next()
    

    } catch (error) {
        return error
    }
}


module.exports = {
    renderPage:show_post,
    search:search_q
    //render:render_post_stories 
}