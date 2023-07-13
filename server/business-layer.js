var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());

app.use(express.urlencoded({
    extended:true
}));

app.use(express.json());

app.get("/products", (req, res)=>{
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("shopping");
        database.collection("products").find({}).toArray()
        .then(documents=>{
            res.send(documents);
            res.end();
        })
    })
});

app.get("/products/:id", (req, res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("shopping");
        database.collection("products").find({ProductId:id}).toArray()
        .then(documents=>{
            res.send(documents);
            res.end();
        })
    })
});

app.post("/addproduct", (req, res)=>{
    var product = {
        "ProductId": parseInt(req.body.ProductId),
        "Name": req.body.Name,
        "Price": parseFloat(req.body.Price),
        "Stock": (req.body.Stock=="true")?true:false
    }
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("shopping");
        database.collection("products").insertOne(product).then((result)=>{
            console.log("Record Inserted");
            res.redirect("/products");
        })
    })
});

app.put("/updateproduct/:id", (req, res)=>{
    var id = parseInt(req.params.id);
    var product = {
        "ProductId": parseInt(req.body.ProductId),
        "Name": req.body.Name,
        "Price": parseFloat(req.body.Price),
        "Stock": (req.body.Stock=="true")?true:false
    }
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("shopping");
        database.collection("products").updateOne({ProductId:id},{$set:product})
        .then(result=>{
            console.log("Record Updated");
            res.redirect("/products");
        })   
    })
});

app.delete("/deleteproduct/:id", (req, res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("shopping");
        database.collection("products").deleteOne({ProductId:id})
        .then(result=>{
            console.log("Record Deleted..");
            res.redirect("/products");
        })
    })
});

app.listen(4455);
console.log(`Server Started : http://localhost:4455`);