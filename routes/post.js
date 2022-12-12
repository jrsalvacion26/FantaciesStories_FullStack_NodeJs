const express = require('express')
const router = express.Router()
const render_post = require('../controller/post')
const read_post = require('../controller/access_story_perPose')
const initpassport = require('../controller/passport-config')
const author = require('../controller/author')
const delete_story = require('../controller/delete_story')
const edit = require('../controller/edit')

const all_author_stories = require('../controller/view_Author_story')

const login = require('../controller/login')
const e = require('connect-flash')
initpassport()


router.get('/read_post/:id',login.checkLogin, read_post.render)

router.get('/',login.checkLogin, render_post.render_post)
router.post('/',render_post.upload.single("image"), render_post.post_user)

router.get('/author',login.checkLogin, author.render)

router.get('/author/all_stories/:id',login.checkLogin, all_author_stories.render)

router.delete('/author/all_stories/delete/:id',login.checkLogin, delete_story.delete)

router.get('/author/all_stories/edit/:id',login.checkLogin, edit.render)
router.put('/author/all_stories/update/',edit.upload.single("image"), edit.update)

module.exports = router