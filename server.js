require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoute = require("./Routes/userRoute");
const postRoute = require("./Routes/postRoute");
const commentRoute = require("./Routes/commentRoute");
const mongoose = require("mongoose")
const morgan = require("morgan")
const app = express();

//////////////////////////
//////Middlewares/////////
//////////////////////////

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"))
app.use("/user", userRoute);
app.use("/", postRoute);
app.use("/", commentRoute);


////////////////////////////////////////////////////////
/// Assign port number & connect to the database/////
////////////////////////////////////////////////////////

const MONGO_URL = process.env.MONGO_URL;

(async() => {
 
 try {  await mongoose.connect(MONGO_URL);
 console.log("Successfully connected to the database")

 const port = process.env.PORT; 
 app.listen(port, () => { 
    console.log(`Server running on port ${port}`)
 })
    
 } catch (err) { 
    console.error("Error connecting to the database")
 }

})(); 