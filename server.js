const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const colors = require('colors');
require('dotenv').config();
require('./config/database');

const app = express()


//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//router import
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

//routes 
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes); 

//port
const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log(`Express app running on port ${port}`);
  });