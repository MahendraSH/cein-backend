const express = require('express');
const {
    Register,
    getAllUsers,
    getUserbyId
    , login,
    logout,
    forgotPassword,
    getmyProfile } = require('../controllers/userController');
const { isAutherizeduser, isAdmin } = require('../utils/auth');
const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(Register);
router.route('/me').get(isAutherizeduser, getmyProfile);
router.route('/logout').get(isAutherizeduser, logout);
router.route('/all').get(isAutherizeduser, isAdmin('admin'), getAllUsers);

// router.route('/:id').get(isAutherizeduser,isAdmin('admin'),getUserbyId);
router.route('/forgot').post(forgotPassword)

module.exports = router;
