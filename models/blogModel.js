const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [3, 'Title must be at least 3 characters'],
        maxlength:[100, 'Title must be less than 100 characters']
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',

    },
    mainContent: {
        type: String,
        required: [true, 'mainContent is required'],
        minLength: [100, 'mainContent must be at least 10 characters'],
        maxlength:[3000, 'mainContent must be less than 3000 characters']
    },
    mainImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },

    },
    paras: [
        {
            type: String,
            required: [true, 'paras is required'],
        }]
    ,

    summary: {
        type: String,
        required: [true, 'Summary is required'],
        minLength: [100, 'Summary must be at least 10 characters'],
        maxlength:[3000, 'Summary must be less than 3000 characters']
    },
    isPublished: {
        type: Boolean,
        default: false,
    },

    publishedAt: {
        type: Date,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: null,
    },

});

module.exports = mongoose.model('Blog', blogSchema);
