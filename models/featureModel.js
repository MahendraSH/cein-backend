const moogoose = require("mongoose");
const featureSchema = new moogoose.Schema({
    title: {
        type: String,
        required: [true, "please provide a title"]
    },
    image: {

        public_id: {

            type: String,
            required: true
        },
        url: {

            type: String,
            required: true

        }
    },
    discrpition: {

        type: String,
        required: [true, "please provide a description"],
    },
    isCard: {
        type: Boolean,
        default: true,
        required: true
    }
});

module.exports = moogoose.model("feature", featureSchema);