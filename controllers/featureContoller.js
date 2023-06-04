
const CatchAsycErrors = require('../middlewares/CatchAsyncErrors');
const Feature = require('../models/featureModel');
const ErrorHandler = require('../utils/ErroHandler');

//  create ferature card 

const createFeatureCard = CatchAsycErrors(async (req, res, next) => {
    
    const {
        title,
        description,
    } = req.body;

    const feature = await Feature.create({
        title,
        description,
        image:{
            public_id: 'this is sample id',
            url: 'profile pic url'
        }
    })


    res.status(201).json({
        success: true,
        feature
    })
});
