const DataUriParser = require('datauri/parser.js');
const path = require('path');
const parser = new DataUriParser();

const getDataUri = (file) => {
    const ext = path.extname(file.originalname).toString();

    return parser.format(ext, file.buffer);
}

module.exports = { getDataUri };