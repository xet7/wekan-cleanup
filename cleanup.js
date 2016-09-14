//MongoDB connect code source modified from http://blog.modulus.io/mongodb-tutorial

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var dbUrl = 'mongodb://localhost:27017/admin';

var theDb;
MongoClient.connect(dbUrl).then(function(db) {
  theDb = db;     // save it, we'll need to close the connection when done.
  var cur = db.collection('cards').find({ "archived": true } );

  return forEachSeries(cur, function(doc) {    // this is the iterator
    if
    return db.collection('cards').updateOne(
      {_id: doc._id},
      {$set: {updated: true}}       // or whatever else you need to change
    );
    // updateOne returns a promise, if not supplied a callback. Just return it.
  });
})
.then(function(count) {
  console.log("All Done. Processed", count, "records");
  theDb.close();
})




db.open(function(err, db) {
    db.collection('Customers', function(err, collection) {
        collection.find(function(err, cursor) {
            cursor.each(function(err, customer) {
                if(customer != null){
                    console.log('First Name: ' + customer.firstName);
                    console.log('Last Name: ' + customer.lastName);
                }
                else{
                    db.close();
                }
            });
        });
    });
});
