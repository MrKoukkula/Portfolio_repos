// const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations');
const Dishes = require('./models/dish');
const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/conFusion";
// const dbname = 'conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected to the server');

    Dishes.create({
        name: 'testypizza',
        description: 'very tasty'
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated tastiness'}
        },{ 
            new: true 
        })
        .exec();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.find();
    }).then((dishes) => {
        console.log('found dishes:')
        console.log(dishes);

        return Dishes.remove();
    }).then(() => {
        return mongoose.connection.close()
    }).catch((err) => console.log(err))
})

/* MongoClient.connect(url, (err, client) => {
    if (err) return new Error('failed to connect');

    console.log("Connected to the server");

    const db = client.db(dbname);
    
    dboper.insertDocument(db, {name: "pizza", description: "Tasty pizza"}, "dishes")
    .then( result => {
        return dboper.findDocuments(db, 'dishes')
    })
    .then(result => {
        console.log(result);
        return db.dropCollection('dishes')
    })
    .then(result => {
        console.log('dropped collection');
        client.close();
    })
    .catch(err => console.log(err))
}) */