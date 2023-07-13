var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const { data } = require("jquery");

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());

app.get("/getcustomers", (req, res)=>{
    mongoClient.connect(connectionString)
    .then(clientObject=>{
        var database = clientObject.db("shopping");
        database.collection("customers").find({}).toArray()
        .then(documents=>{
            res.send(documents);
            res.end();
        })
    })

});

app.post("/addcustomers", (req, res)=> {
    var userDetails = {
        "UserId": req.body.UserId,
        "UserName": req.body.UserName,
        "Password": req.body.Password,
        "Email": req.body.Email,
        "Mobile": req.body.Mobile
    }
    mongoClient.connect(connectionString)
    .then(clientObject=>{
        var database = clientObject.db("shopping");
        database.collection("customers").insertOne(userDetails)
        .then(success=> {
            console.log(`Record Inserted`);
            res.redirect("/getcustomers");
        })
    })
});


app.listen(4400);
console.log(`Server Started : http://localhost:4400`);