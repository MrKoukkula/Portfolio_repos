const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteDish = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }
})

const favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    favorites: [favoriteDish]
}, {
    timestamps: true
})

var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;