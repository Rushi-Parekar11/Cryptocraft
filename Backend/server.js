const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require("cors");
const PORT = process.env.PORT || 8080
const router = require("./Routers/AllRoutes")


app.use(cors());
app.use(bodyParser.json());
app.use('/', router);

//----------- DB CONNECTION-----------------
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("Successfully connected to Database.. ")
})
.catch((err)=>{
   console.log("MongoBD connection error!",err)
})



app.listen(PORT,()=>{
    console.log(`app is listen at ${PORT}`);
})