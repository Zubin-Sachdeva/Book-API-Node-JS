var express = require('express');

var routes = function(book) {

    let bookrouter = express.Router();
    var bookController = require('../controller/bookController')(book);
    bookrouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

    bookrouter.use('/:bookId', function(req, res, next) {
        book.findById(req.params.bookId, function(err, books){
            if(err){
                res.status(500).send(err);
            }
            else if(books){
                req.books = books;
                next();
            } else {
                res.status(404).send('no book found');
            }
        });
    })

    bookrouter.route('/:bookId')
    .get(function(req, res) {
        res.json(req.books);
    })
    .put(function(req, res) {
        
        req.books._id = req.body._id;
        req.books.name = req.body.name;
        req.books.author = req.body.author;
        req.books.year = req.body.year;
        books.save(function(err){
            if(err)
                res.status(500).send(err);
            else
                res.json(req.books);
        });
    })
    .patch(function(req, res) {
        if(req.body._id){
            delete req.body._id;
        }
        for(var p in req.body){
            req.books[p] = req.body[p];
        }
        req.books.save(function(err){
            if(err)
                res.status(500).send(err);
            else
                res.json(req.books);
        });
    })
    .delete(function(req, res) {
        req.books.delete(function(err){
            if(err){
                res.status(500).send(err);
            } else {
                res.status(204).send('removed');
            }
        });
    });


    return bookrouter;
};

module.exports = routes;