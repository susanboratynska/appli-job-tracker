const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;



//basic express app - source https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3
//an express app interfaces with the database by handling api requests
//import mysql when you want to use that
require('dotenv').config();
const express = require('express');
const path = require('path');

const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

var database, collection;

const CONNECTION_URL = "OUR MONGO DB STRING";
const DATABASE_NAME = "data";


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));





// Serve the static files from the React app -- only viewable once react app is built for production deployment
app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("users");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
    var list = ["Doggus", "Echo", "Perogi"];
    res.json(list);
    console.log('Sent list of items (not from database)');
});

//api endpoint that returns list of dogs in the database
app.get('/api/users/list', (req, res) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});
