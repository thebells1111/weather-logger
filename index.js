const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

var app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

MongoClient.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    // ...
    const db = client.db('weather');
    const collection = db.collection('home');

    app.get('/', (req, res) => {
      collection
        .find()
        .toArray()
        .then((results) => {
          console.log(results);
          res.json(results);
        })
        .catch((error) => console.error(error));
    });

    app.post('/', (req, res) => {
      collection
        .insertOne(req.body)
        .then((res) => {
          res.redirect('/');
        })
        .catch((error) => console.error(error));
    });

    app.put('/quotes', (req, res) => {
      collection
        .findOneAndUpdate
        // { name: 'name' },
        // {
        //   $set: {
        //     name: req.body.name,
        //     quote: req.body.quote,
        //   },
        // },
        // {
        //   upsert: true,
        //}
        ()
        .then((res) => {
          //console.log(res)
          res.redirect('/');
        })
        .catch((error) => console.error(error));
    });

    app.delete('/', (req, res) => {
      collection
        .deleteOne
        //{ name: req.body.name }
        ()
        .then((res) => {
          res.json(`Deleted`);
        })
        .catch((error) => console.error(error));
    });

    app.listen(3000, function () {
      console.log('Your server available at http://localhost:3000.');
    });
  })
  .catch(console.error);
