//Required Code
const {ObjectId} = require('mongodb');
let bodyParser   = require('body-parser');
let dbo = null;
let VERBOSE = true;

// Code that lets you start Express
let express = require('express');
let app = express();

//Configuring Directory
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('Document Selector'));
app.use('/css', express.static(__dirname + '/Document Selector/css'));
app.use('/js', express.static(__dirname + '/Document Selector/js'));

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://docquiz:echolab_docquiz@docquiz.vyljr4o.mongodb.net/test";

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
  
    dbo = db.db("docquiz");
    console.log(dbo.listCollections())
    if(VERBOSE)console.log("Database created!");
    
    dbo.listCollections({name: "selected-sentences"}).next(function(err, collinfo) {
      if (collinfo) {
        console.log("Collection selected-sentences exists");
      } else {
        dbo.createCollection("selected-sentences", function(err, res) {
          if (err) throw err;
          if(VERBOSE)console.log("Collection selected-sentences created!");
        });
      }
    })
  });

  app.post('/new-selected-sentences', function (request, data) {
    
  });

  app.get('/get-data', function (request, data) {

  });

//Server port
let server = app.listen(8081, function(){
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
