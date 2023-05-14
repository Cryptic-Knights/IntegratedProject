const express = require("express");
const { json, urlencoded } = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose")
require("dotenv").config();   

// Importing routes
const auth = require("./routes/auth");
const transaction = require("./routes/transaction");
const admin = require("./routes/admin");
const wallet = require("./routes/wallet");
const flag = require("./routes/flag");

//--------Application-----------
const app = express();

//--------Middleware------------
app.use(json());
app.use(urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());


//--------Routes----------------
app.use("/auth", auth);
app.use("/transaction", transaction)
app.use("/wallet", wallet);
app.use("/admin", admin);
app.use("/flag", flag);

app.get("/test", (req, res) => {
    // res.status(200).send("Success the server is up and running")
    try {
        res.status(200).send("Up and running");
    }
    catch (err) {
        console.log(err);
    }
})

app.get("/api/test", (req, res) => {
    // res.status(200).send("Success the server is up and running")
    try {
        res.redirect(301, "http://localhost:3000/");
    }
    catch (err) {
        console.log(err);
    }
})

//--------Server broadcasting----------
// First connect to the database then start the server
mongoose.connect(process.env.URI).then( async () =>{
    console.log("Connected to the databse");

    app.listen(process.env.PORT, () => {
        console.log(`Server started at port ${process.env.PORT}`);
    });

    database = mongoose.connection;
    
}).catch((error) => {
    console.log("An error has been encountered ", error);
})