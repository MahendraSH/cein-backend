
const express = require('express');
const { getLandingPageImages, uploadLandingPageImage, deleteLandingPageImage } = require('../controllers/landingPageContollers');
const { upload } = require('../middlewares/multer');
const { isAutherizeduser } = require('../utils/auth');
const router = express.Router();

router.route('/all').get(getLandingPageImages);
router.route('/upload').post( isAutherizeduser,upload, uploadLandingPageImage);
router.route('/delete/:id').delete(isAutherizeduser,deleteLandingPageImage);

module.exports = router;