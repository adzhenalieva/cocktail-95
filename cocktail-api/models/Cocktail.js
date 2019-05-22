const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
    title: {
        type: String, required: true
    },
    recipe: {
        type: String, required: true
    },
    image: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    published: {
        type: Boolean,
        default: false
    },
    ingredients: [{name: String, amount: String}],
    marks: [{user: String, mark: String}]
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
module.exports = Cocktail;