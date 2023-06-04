const {
    getAllBlogPost
    , getBlogById,
    updateBlogPost,
    CreateBLogPost } = require('../controllers/blogController')
const express = require('express');
const { isAutherizeduser } = require('../utils/auth');
const router = express.Router()

router.route('/all').get( isAutherizeduser,getAllBlogPost);
router.route('/:id').get(isAutherizeduser, getBlogById).put(isAutherizeduser, updateBlogPost);
router.route('/create').post(isAutherizeduser, CreateBLogPost);

module.exports = router;