const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

let uri = process.env.MONGOLAB_URI;

mongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log(err);
    }

    db = client.db('url-shortener-doug')

    app.listen(3000, () => {
        console.log('Application Started on port 3000!');
    });
})

app.route('/').get((req, res) => {
    
    let cursor = db.collection('data').find();
    res.render('index.ejs');
}).post((req, res) => {

    db.collection('data').insertOne(req.body, (err, result) => {
        if (err) {
            return console.log(err);
        }

        res.redirect('/');

        // db.collection('data').find().toArray((err, results) => {
        //     if (err) {
        //         return console.log(err);
        //     }
        // });
    });
});