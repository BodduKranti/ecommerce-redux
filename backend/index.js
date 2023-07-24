const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// npm i bcrypt [change the password in hash mode]
// npm i jsonwebtoken [for secure the data]

app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "120mb", extended: true }))

//mongoose connection import
require("./connection/Connection")

//router import 
const mainRouter = require("./routes/Routes")

PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

// main route from index
app.use("/", mainRouter)