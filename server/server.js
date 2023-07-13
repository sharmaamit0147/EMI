var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var app = express();
app.use(cors());

var conString = "mongodb://127.0.0.1:27017";

app.get("/", (req, res)=> {
    res.send("<h2>Welcome to My API</h2>");
});

app.get("/products", (req, res)=>{
    mongoClient.connect(conString)
    .then((clientObject)=>{
        var database = clientObject.db("shopping");
        database.collection("products").find({}).toArray()
        .then(documents => {
            res.send(documents);
            res.end();
        })
    })
});

app.get("/customers", (req, res)=>{
    mongoClient.connect(conString)
    .then((clientObject)=>{
        var database = clientObject.db("shopping");
        database.collection("customers").find({}).toArray()
        .then(documents=>{
            res.send(documents);
            res.end();
        })
    })
});

app.get("*", (req, res)=>{
    res.send("<code>Not Found : Page you requested not found.</code>");
});

app.listen(4400);
console.log(`Server Started : http://127.0.0.1:4400`);