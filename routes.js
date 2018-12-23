'use strict';

const WELCOME_MESSAGE = 'Welcome sir';

const express = require('express');
const router = express.Router();

const { ObjectId, MongoClient } = require('mongodb');

const { CONNECTION_STRING, DATABASE_NAME, API_KEY } = process.env;

var database, collection;

const initRoutes = () => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("posts");
        console.log(WELCOME_MESSAGE);
    });
};

router.get('/', (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

router.get('/posts/:postId', (request, response) => {
    collection.find(ObjectId(request.params.postId)).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

router.post('/add', (request, response) => {
    if(request.body.mongoKey === API_KEY) {
        collection.insertOne(request.body.newPost, (error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            return response.status(200).send(result);
        });
    } else {
        return response.status(403).send({ ok: 0, message: 'Bad Credentials!'});
    }
});

module.exports = { initRoutes, router };
