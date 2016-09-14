Delete all Archived cards from all boards that is order than 60days old.


```javascript
# Enter mongo container, it you use Docker:
docker exec -it wekan-db bash

# Connect to mongo database:
mongo

# Or if mongo is running on other port:
mongo --port 31337

# Show databases:
show dbs

# Use admin database, default on docker mongo:
use admin

# Show what collections are in database
show collections

# Show how many archived cards there are in cards collection
db.cards.find( { "archived": true } ).count()
160

"dateLastActivity" : ISODate("2016-06-25T11:49:28.728Z"),

db.cards.find( { "archived": true } )

db.cards.find( { "archived": true }, { "dateLastActivity" : {$gte: new Date(ISODate().getTime() - 1000 * 3600 * 24 * 60) } } ).count()

db.cards.find( { "archived": true }, { "dateLastActivity" : {$gte: new Date(ISODate().getTime() - 1000 * 3600 * 24 * 60) } } ).count()

> ISODate()
ISODate("2016-08-04T12:59:48.907Z")

query = {
    timestamp: { // 18 minutes ago (from now)
        $gte: new Date(ISODate().getTime() - 1000 * 3600 * 24 * 60)
    }
}
```


Card archived 60 days ago:

```javascript
> db.cards.find( { "archived": true }, { "dateLastActivity" : {$gte: new Date(ISODate().getTime() - 1000 * 3600 * 24 * 60) } } ).count()

db.cards.find( { "archived": true }, { "dateLastActivity" : ISODate("2016-08-04T11:49:28.728Z") } ).count()

"dateLastActivity" : ISODate("2016-06-25T11:49:28.728Z"),

root@4961cf686583:/data# mongo --quiet admin --eval 'printjson(db.cards.find( { "archived": true } ).toArray())' > archived.json
```


[RoboMongo](https://robomongo.org) tests:

```javascript
db.getCollection('cards').find({ "dateLastActivity" : {$gte: new Date(ISODate().getTime() - 1000 * 3600 * 24 * 60) })

db.getCollection('cards').find({ "archived": true }, { "dateLastActivity" : {$lte : new Date(2016, 8, 1) } } )

{ access_time : {"$lt" : new Date(2013, 8, 1) } }

db.getCollection('cards').find({ "dateLastActivity": {$gte: Date("2016-06-01T00:00:00.000Z") } } )

Works:
db.getCollection('cards').find({ "archived": true } )

Works:
db.getCollection('cards').find({ "dateLastActivity": {$gte: Date("2016-06-01T00:00:00.000Z") } } )

Works:
db.getCollection('cards').find({ "dateLastActivity": {$gte: new Date(2016, 7, 1) } } )

Works:
db.getCollection('cards').find({ "dateLastActivity": {$gte: new Date(2016, 6, 1) } } )

db.posts.find({created_on: {$gte: start, $lt: end}});

db.getCollection('cards').find({ "archived": true }, { "dateLastActivity": {$lte: new Date(2016, 7, 1) } } )

db.getCollection('cards').find({{ "archived": true }, { "dateLastActivity": {$lte: new Date(2016, 7, 1) } } } )

db.getCollection('cards').find( { { _id: { $nin:db.cards.find( { "archived": false } ) } } , "dateLastActivity": {$lte: new Date(2016, 7, 1)} } ,  )

temp = db.cards.find({ "archived": true } ); db.getCollection('cards').find( { "dateLastActivity": {$lte: new Date(2016, 7, 1)} }, { _id:{$in:temp}} )

db.getCollection('cards').find( { $and: [ { "archived": true }, { "dateLastActivity": {$gte: new Date(2016, 6, 1) } } ] )

db.cards.find( { $and: [ { "archived": true }, { "dateLastActivity": {$gte: new Date(2016, 7, 1) } } ] } ).count();
```
