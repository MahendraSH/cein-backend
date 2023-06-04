
const CatchAsycErrors = require('../middlewares/CatchAsyncErrors');
const User = require('../models/userModels');
const ErrorHandler = require('../utils/ErroHandler');
const jwtcooki = require('../utils/Jwtcooki');
const cloudinary = require('cloudinary').v2;

const login = CatchAsycErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("please enter email and password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("invalid email or password", 401));
    }
    jwtcooki(res, 200, user);

});
const Register = CatchAsycErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const cloudUpload = await cloudinary.uploader.upload(req.body.avatar, {
        folder: "cenIN/avatars",
        width: 150,
        crop: "scale"

    });
    const user = await User.create({
        name,

        email,
        password,
        avatar: {
            public_id: cloudUpload.public_id,
            url: cloudUpload.secure_url
        }


    });
    jwtcooki(res, 201, user);

});

const getAllUsers = CatchAsycErrors(async (req, res, next) => {

    const users = await User.find();
    res.status(200).json({

        success: true,
        users

    });

});

const getUserbyId = CatchAsycErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
        success: true,
        user
    });
});

const forgotPassword = CatchAsycErrors(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new ErrorHandler("email requird: enter email", 400));
    }
    const user = await User.findOne(email);

    if (!user) {
        return next(new ErrorHandler("invalid email ", 401));

    }
    res.status(200).json({
        success: true,
        message: " working on reset password"
    })
})

const getmyProfile = CatchAsycErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
});

const logout = CatchAsycErrors(async (req, res, next) => {
    res.cookie("loginToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "logout successfully"
    })
});


module.exports = { Register, getAllUsers, getUserbyId, login, forgotPassword, getmyProfile, logout };



