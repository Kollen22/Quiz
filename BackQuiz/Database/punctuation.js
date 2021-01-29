const mongoose = require('mongoose');

const Point = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    punc:{
        type: Number,
        required: true,
    }
});

const Puctuation = mongoose.model('Punctuation', Point);
module.exports = Puctuation;