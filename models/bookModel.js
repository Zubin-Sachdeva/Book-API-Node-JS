let mongoose = require('mongoose'), Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var bookModel = new Schema({
    _id: {
        type: String
    },
    name: { type: String },
    author: { type: String },
    year: { type: String }
}, {
    versionKey: false
});

module.exports = mongoose.model('book', bookModel, 'Book');