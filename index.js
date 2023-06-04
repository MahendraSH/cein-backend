const app = require("./app");
const cloudinary = require("cloudinary");   
const dbConnect = require("./config/conectionDB");
// const dotenv = require("dotenv").config({ path: "./config/.env" });
const  dotenv = require("dotenv").config();

process.on('uncaughtException', (err) => {
   
    console.log(" uncaughtException error sever shutdowing ------......");

    process.exit(1);

});
const PORT = process.env.PORT || 4000;



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


dbConnect();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`); 
    // console.log(process.env);r
});


process.on('unhandledRejection', (err) => {
   
    console.log(" unhandledRejection error sever shutdowing ------......");
    server.close(() => {
        process.exit(1);
    });
});