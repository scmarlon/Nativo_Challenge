//"import" the DB
const { ObjectId } = require('mongodb');
const shortener = require('shortid')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/nativoDB";

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

//Search in the DB a specific link
async function findlink() {
    let myPromise = new Promise(function (myResolve, myReject) {
        // "Producing Code" (May take some time)
        MongoClient.connect(url, function (err, db) {
            if (err) myReject(err);
            var dbo = db.db("nativoDB");
            dbo.collection("customLinks").find({}).toArray(function (err, result) {
                if (err) myReject(err);  // when error;
                db.close();
                myResolve(result); // when successful
            });
        })
    }).catch(error => { console.log() });
    return myPromise;
}

//This function return all only 20 links, the most frequently visited
function frequentlyLinks (){
    let myPromise = new Promise(function (myResolve, myReject) {
        MongoClient.connect(url, function (err, db) {
            if (err) myReject(err);
            var dbo = db.db("nativoDB");
            dbo.collection("customLinks").find({}).sort({visitCount: -1}).limit(20).toArray(function (err, result) {
                if (err) myReject(err); 
                db.close();
                myResolve(result); 
            });
        })
    }).catch(error => { console.log() });
    return myPromise;
}

//To create a unique short code for links
function generateShortener() {
    const newLink = shortener.generate();
    return newLink;
}


//This function insert a new link in the BD
function newLink(link) {
    const linkGenerate = generateShortener();
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("nativoDB");
        var myobj = { links: link, visitCount: 0, shortLink: linkGenerate };
        dbo.collection("customLinks").insertOne(myobj, function (err, res) {
            if (err) throw err;
            db.close();
        });
    });
}

//In this function, the link shortener that had been generated for each link is searched, it is to be able to redirect to the full link
async function searchForLink(shortLink) {
    let myPromise = new Promise(function (myResolve, myReject) {
        MongoClient.connect(url, function (err, db) {
            if (err) myReject(err);
            var dbo = db.db("nativoDB");
            dbo.collection("customLinks").findOne({ shortLink: shortLink }, (function (err, result) {
                if (err) myReject(err);  
                db.close();
                myResolve(result); 

            }));
        })
    }).catch(error => { console.log() });
    return myPromise;
}

//Just to know if the links already exist
async function insertLink(link) {
    var exist = false;
    const result = await findlink();
    for (let i = 0; i < result.length; i++) {
        if (link === result[i].links) {
            exist = true;
            break;
        }
    }
    if (!exist) {
        newLink(link);
    }
}

//Increase the Visits
async function increaseVisit(id) {
    MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db("nativoDB");

        dbo.collection("customLinks").find({ _id: ObjectId(id) }).toArray(function (err, result) {
            if (err) throw err;
            var testCount = result[0].visitCount
            var myquery = { links: result[0].links };
            var newvalues = { $set: { visitCount: testCount + 1 } };
            dbo.collection("customLinks").updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                db.close();
            });
        });
    });
}

module.exports = { insertLink, findlink, increaseVisit, searchForLink, frequentlyLinks }