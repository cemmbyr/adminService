const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');

const loginRoutes = require('./api/routes/login'); 
const registerUser = require('./api/routes/registerUserRoutes');
const registerAdmin = require('./api/routes/registerAdminRoutes');

mongoose.connect("mongodb+srv://dbUser:"+
process.env.MONGO_ATLAS_PW+
"@cluster0-rck1x.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser: true
});

mongoose.Promise=global.Promise;


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'./api/views'));

app.use('/public',express.static(path.join(__dirname,'public')));

app.use(ejsLayouts);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/login',loginRoutes);
app.use('/registerUser',registerUser);
app.use('/registerAdmin',registerAdmin);

app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=> {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
})

module.exports = app;