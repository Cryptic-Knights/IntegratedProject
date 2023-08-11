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
const user =   require("./routes/user");

//--------Application-----------
const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

//--------Middleware------------
app.use(json());
app.use(urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

app.set("trust proxy", 2);


//--------Routes----------------
app.use("/auth", auth);
app.use("/transaction", transaction)
app.use("/wallet", wallet);
app.use("/admin", admin);
app.use("/user", user);

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