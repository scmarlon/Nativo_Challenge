// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/nativoDB";

//---New database---
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     db.close();
// });


//---New Collection---
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("nativoDB");
//     dbo.createCollection("customLinks", function (err, res) {
//         if (err) throw err;
//         console.log("Collection created!");
//         db.close();
//     });
// });


//---Insert to database---
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("nativoDB");
//     var myobj = { links: "abcd", visitCount: 0 };
//     dbo.collection("customLinks").insertOne(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//         db.close();
//     });
// });

//---Print Data Base---
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("nativoDB");
//     dbo.collection("customLinks").find({}).toArray(function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });

// const test1 = "lpksjfdhg"
// const test2 = "1213124"

// module.exports = { f1: test1, f2: test2 };