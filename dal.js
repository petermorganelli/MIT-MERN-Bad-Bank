
const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb+srv://Petermorganelli:F54lcA2E5Mq05P3y@cluster0.fm3psui.mongodb.net/?retryWrites=true&w=majority';
let db            = {};

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('Badbank');
});

// create user account
function create(name, email, password, balance){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}
// update - user info
// function update(name, email, amount){
//     return new Promise((resolve, reject) => {    
//         const collection = db.collection('users')            
//             .findOneAndUpdate(
//                 {email: email},
//                 { name},
//                 { returnNewDocument: true },
//                 function (err, documents) {
//                     err ? reject(err) : resolve(documents);
//                 }
//             );            


//     });    
// }

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}



// delete - delete an account
function deleteAccount(email) {
    return new Promise((resolve, reject) => {
      const customers = db
        .collection('users')
        .findOneAndDelete({ email: email })
  
        .then((doc) => resolve(doc))
        .catch((err) => reject(err));
    });
  }




module.exports = {create, findOne, find, update, all, deleteAccount};