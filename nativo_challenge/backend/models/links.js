const { ObjectId } = require('mongodb');
const { test } = require('picomatch');

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

//---Print Data Base---
//insertLink(link)

// findlink()

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

function generateShortener(){

    const newLink = shortener.generate();
    console.log("soy shortener: ", newLink)

    return newLink;
   

}

function newLink(link) {
    const linkGenerate = generateShortener();

    console.log("SOY GOD",linkGenerate)

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

async function increaseVisit(id){
    MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    var dbo = db.db("nativoDB");

    dbo.collection("customLinks").find({_id:ObjectId(id)}).toArray(function (err, result) {
        if (err) throw err;
        var testCount = result[0].visitCount
        var myquery = { links: result[0].links };
        var newvalues = { $set: { visitCount: testCount + 1 } };
        dbo.collection("customLinks").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
    });

    
});
    
}

module.exports = { insertLink, findlink, increaseVisit }





// const test1 = "lpksjfdhg"
// const test2 = "1213124"

//  module.exports = { insertlink: insertLink(link) };


