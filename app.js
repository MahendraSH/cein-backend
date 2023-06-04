const express = require('express');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const app = express();
const cors = require('cors');
// require('dotenv').config({ path: './config/.env.local' });

// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// app.use(cors());
app.use(cors({ credentials: true, origin: 'https://ceinmain.onrender.com'}));
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
app.use(cookieParser());
app.use('/api/landing', require('./routers/landingPageRouters'));
app.use('/api/user', require('./routers/userRoutes'));
app.use('/api/post', require('./routers/blogRoutes'));

app.use(require('./middlewares/errorController'));
module.exports = app;

