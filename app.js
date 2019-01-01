const express = require('express'), mongoose = require('mongoose'), 
bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://zubins:mongodb2512@cluster0-shard-00-00-zlo3s.mongodb.net:27017,cluster0-shard-00-01-zlo3s.mongodb.net:27017,cluster0-shard-00-02-zlo3s.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=truemongodb+srv://zubins:mongodb2512@cluster0.mongodb.net/test?retryWrites=true', { useNewUrlParser: true, dbName: 'BookAPI' });

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
    console.log('connected...');
});
let book = require('./models/bookModel');

let app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

bookrouter = require('./routes/bookRoute.js')(book);

app.use('/api/books', bookrouter);

app.get('/', function (req, res) {
    res.send('How you doin?');
});

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb://zubins:mongodb2512@cluster0-shard-00-00-zlo3s.mongodb.net:27017,cluster0-shard-00-01-zlo3s.mongodb.net:27017,cluster0-shard-00-02-zlo3s.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=truemongodb+srv://zubins:mongodb2512@cluster0.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("BookAPI").collection("Book");
//  // perform actions on the collection object
//     //console.log(collection);
//     client.db("BookAPI").collection('Book').find().toArray(function(err, Book) {
//         console.log(JSON.stringify(Book));
//     });
//   client.close();
// });


app.listen(port, function() {
    console.log('Listening on port: ' + port);
});

