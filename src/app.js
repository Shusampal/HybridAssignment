const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongo = require('./configs/database');
const authRouter = require('./controllers/auth')
const buyerRouter = require('./controllers/buyer')
const sellerRouter = require('./controllers/seller')
const cookieParser = require('cookie-parser')
const PORT = 5000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


// Mongo DB connection
const connectDB = async () => {
    try {
        await mongoose.connect(mongo.url , {useNewUrlParser: true });
        console.log('hybridAssignment DB Connected ...');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        connectDB();
    }
}


// Calling the function to connect MongoDB
connectDB();



// To Route all request
app.use(authRouter);
// app.use(buyerRouter);
// app.use(sellerRouter);


// To handle Not found resources
app.use('*', (req, res) => {
    res.status(404).json({
        error : true,
        message : 'resource not found',
        statusCode : 404,
    })
})


// To handle error in request ( if any uncaught )
app.use((err, req, res, next) => {
    if (err) {

        if(err.statusCode){
            return res.status(err.statusCode).json({
                error : true,
                message : err.message,
                statusCode : err.statusCode
            })
        }
        else {
            return res.status(500).json({
                error : true,
                message : 'internal server error',
                statusCode : 500
            })
        }
        
    }
})


app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})
