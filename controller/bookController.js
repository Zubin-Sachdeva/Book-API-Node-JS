 
var bookController = function(book) {
    var post = function(req, res) {
        let bk = new book(req.body);

        if(!req.body.name){
            res.status(400);
            res.send('Title is required');
        } else {
            bk.save();
            res.status(201);
            res.send(bk);
        }
        
    };

    var get = function(req, res) {
        var query = {};

        if(req.query.author){
            query.author = req.query.author;
        }

        book.find(query, function(err, books){
            if(err){
                res.status(500).send(err);
            } else {
                console.log("Here...");
                res.json(books);
            }
        });
    };

    return {
        post, get
    }
}

module.exports = bookController;
