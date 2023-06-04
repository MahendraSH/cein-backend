const CatchAsycErrors = require("../middlewares/CatchAsyncErrors");
const ErrorHandler = require("./ErroHandler");
const jwt = require("jsonwebtoken");
const User = require('../models/userModels');

const isAutherizeduser = CatchAsycErrors(async (req, res, next) => {

    const { loginToken } = req.cookies;

    if (!loginToken) {

        return (next(new ErrorHandler("Please login to access this route", 401)));
    }
    const decodeData =  jwt.verify(loginToken, process.env.JWT_SECRET);

    const user = await User.findById(decodeData.id);
    if (!user) {
        return (next(new ErrorHandler("Please login to access this route", 401)));
    }
    req.user = user;

    next();


});

const isAdmin = (...roles) => {

    return (req, res, next) => {
        if (!req.user.role) {

            return (new ErrorHandler("something went wrong user not undinfied or user role not defined", 404));


        }
        if (!roles.includes(req.user.role)) {
            return (new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();

    }
}


module.exports = { isAutherizeduser, isAdmin };