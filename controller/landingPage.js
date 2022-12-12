let landing_page = (req,res) => {
    
    return res.render('../view/landingpage.ejs')
    
}

module.exports = {
    landing_page:landing_page
}