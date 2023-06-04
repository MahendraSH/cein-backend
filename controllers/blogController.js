const CatchAsycErrors = require('../middlewares/CatchAsyncErrors');
const Blog = require('../models/blogModel');
const ErrorHandler = require('../utils/ErroHandler');
const cloudinary = require('cloudinary').v2;


const CreateBLogPost = CatchAsycErrors(async (req, res, next) => {
    const { title, content, mainContent , summary ,paras } = req.body;
    let { isPublished } = req.body;
    

   if(paras.lenght > 10){
       return next(new ErrorHandler('Paras should be less than 10', 400));
   }
    let publishedAt=null;

    if (!isPublished) {
        isPublished = false;
    }
    else {
        publishedAt = Date.now();

    }
      console.log(req.body);

    const cloudUpload = await cloudinary.uploader.upload(req.body.mainImage, {
        folder: "cenIN/avatars",
        width: 300,
        higth: 250,
        crop: "scale"

    });

    const blog = await Blog.create({
        title,
        author: req.user,
        isPublished,
        publishedAt,
        mainContent,
        summary,
        paras,
      mainImage:{
        public_id: cloudUpload.public_id,
        url: cloudUpload.secure_url,
      }

    });
    res.status(200).json({
        success: true,
        message: 'Blog Post Created Successfully',
    });
});

const getAllBlogPost = CatchAsycErrors(async (req, res, next) => {
    const blog = await Blog.find().populate('author');
    res.status(200).json({
        success: true,
        blog,
    });
});

const getBlogById = CatchAsycErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id).populate('author');
    if (!blog) {
        return next(new ErrorHandler('Blog not found', 404));
    }
    res.status(200).json({
        success: true,
        blog,

    });

});

const updateBlogPost = CatchAsycErrors(async (req, res, next) => {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
        return next(new ErrorHandler('Blog not found', 404));
    }
    req.body.updatedAt=Date.now();
    const updatedAt=Date.now(); 
    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({

        success: true,
        blog,
        message: 'Blog Post Updated Successfully',
    });
});

module.exports = { getAllBlogPost, getBlogById, updateBlogPost, CreateBLogPost };

