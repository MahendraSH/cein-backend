const featureModel  = require('../models/featureModel');
const CatchAsycErrors =require('../middlewares/CatchAsyncErrors');

exports.createFeature = CatchAsycErrors(async (req, res, next) => {
    const feature = await featureModel.create(req.body);
  res.status(201).json({
    success: true,
    feature,
  });
});n

exports.getAllfeatures = CatchAsycErrors(async (req, res, next) => {
  const features = await featureModel.find();
  res.status(200).json({
    
    success: true,
    success: true,
    features,
  }
  );
  
}

);
