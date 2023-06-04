const CatchAsycErrors = require("../middlewares/CatchAsyncErrors");
const ErrorHandler = require("../utils/ErroHandler");
const { getDataUri } = require("../utils/dataUri");
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv').config({ path: '../config/.env' });
const getLandingPageImages = CatchAsycErrors(
    async (req, res, next) => {

    //    return  next (new ErrorHandler("Not found", 404  ));
        const options = {
            next_cursor: req.query.next_cursor,
            max_results: 300,
        };

        const imageslist = await cloudinary.api.resources(options);


        const imagesUse = imageslist.resources.map((image) => {
            if (image.folder == "cenIN/landingPage") {

                return {
                    public_id: image.public_id,
                    url: image.secure_url,
                    folder: image.folder,
                    altName: image.public_id.split("/")[2],
                };
                // return image;
            }
        })
        const images = imagesUse.filter((image) => {
            return image != null;
        });

        //    const images = imageslist.resources;

        res.status(200).json({
            success: true,
            images,
            next_cursor: imageslist.next_cursor,
        });

    }
);
const uploadLandingPageImage = CatchAsycErrors(
    async (req, res, next) => {
        const file = getDataUri(req.file);
        const image = await cloudinary.uploader.upload(file.content, {
            folder: "cenIN/landingPage",
            crop: "scale",
        })


        res.status(200).json({
            success: true,
            message: "Image uploaded successfully not now ",

            images: [{
                public_id: image.public_id,
                url: image.secure_url,
                folder: image.folder,
                altName: image.public_id.split("/")[2],
            },]

        });
    }

);

const deleteLandingPageImage = CatchAsycErrors(
    async (req, res, next) => {
        const public_id = "cenIN/landingPage/" + req.params.id;
        // console.log(req.params.id);
        const result = await cloudinary.uploader.destroy(public_id);
        res.status(200).json({
            success: true,
            message: "Image deleted successfully",
            result,
        });
    });

module.exports = { getLandingPageImages, uploadLandingPageImage, deleteLandingPageImage };
