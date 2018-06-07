var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
var url = "mongodb://localhost:27017/";
module.exports = {
    find: function (table, qry, callback /* this is how you get the result */ ) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("invDB");
            dbo.collection(table).find(qry).toArray(function (err, result) {
                if (err) {
                    return callback(err);
                }
                callback(null, result); // here we call the callback
                db.close();
            });
        });
    },
    writeOne: function (table, params) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("invDB");
            dbo.collection(table).insertOne(params);
            db.close();
        });
    },
    delete: function (table, qry) {
        MongoClient.connect(url, function (err, db) {
            if (qry != null || undefined) {
                console.log("Deleting " + qry + " from " + table);
                if (err) throw err;
                var dbo = db.db("invDB");
                dbo.collection(table).remove(qry);
                db.close();
            }
        });
    },
    edit: function (table, id, qry) {
        console.log("Changing " + id + " within " + table + " to " + qry);
        MongoClient.connect(url, function (err, db) {
            var dbo = db.db("invDB");
        dbo.collection(table).updateOne(id, {$set: qry}, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
    });
    }
};