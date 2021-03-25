const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

const Favorite = require('../models/favorite');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favorite.find({user: req.user._id})
            .populate('user')
            .populate('favorites._id')
            .then((favorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorite.find({user: req.user._id})
            .then((favorite) => {

                if (favorite.length == 0) {
                    var newFavorite = new Favorite({
                        user: req.user._id,
                        favorites: req.body
                    })

                    newFavorite.save()
                    .then((favorites) => {
                        console.log(favorites);
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorites);
                    })
                    .catch((err) => next(err))

                } else if (favorite.length > 0) {

                    const favs = favorite[0].favorites;

                    req.body.forEach(dish => {
                        if (favs.findIndex((fav) => fav._id == dish._id) == -1) {
                            favorite[0].favorites.push(dish)
                        }
                    });
                    
                    favorite[0].save()
                    .then((favorites) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorites);
                    })
                    .catch((err) => next(err))
                }
            })
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorite');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorite.findOneAndDelete({user: req.user._id})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

favoriteRouter.route('/:dishId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favorite.findOne({user: req.user._id})
        .populate('favorites._id')
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite.favorites.id(req.params.dishId));
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorite.findOne({user: req.user._id})
        .then((favorite) => {
            const favs = favorite.favorites;

            if (favs.findIndex((fav) => fav._id == req.params.dishId) == -1) {
                favorite.favorites.push({_id: req.params.dishId})
            }

            favorite.save()
                .then((favorites) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorites);
                })
                .catch((err) => next(err))
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorite');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Favorite.findOne({user: req.user._id})
            .then(favorite => {
                favorite.favorites.id(req.params.dishId).remove();
                favorite.save()
                .then(favorite => {
                    Favorite.findOne({user: req.user._id})
                    .populate('favorites._id')
                    .then(fav => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(fav);
                    }, (err) => next(err))
                }, (err) => next(err))
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = favoriteRouter;