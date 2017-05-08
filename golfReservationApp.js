//delcare we need express
var express = require('express');

//get the current path of the application
var path = require('path');

//declare mongoose so we can turn
//mongodb data into json data
var mongoose = require('mongoose');

//allows express to take the value of whatever is
//in the request body and parse it into a json obj
var bodyParser = require('body-parser');

//use cors to allow other domains to access the endpoint
var cors = require('cors');

var dbURI = 'reservationAPI';
var db = mongoose.connect('mongodb://localhost/'+dbURI);

//check to see if can connect to db
mongoose.connection.on('connected', () => {
    console.log("\nmongoose was able to establish a database connection to: " + "\"" + dbURI + "\"");
});

//spit out message if db connection error
mongoose.connection.on('error', (err) => {
    console.log("\nDatabase connection error\n" + err);
});

var Reservation = require('./models/reservationModel');

//create an instance of express
var app = express();

//setup our listening ports
var port = process.env.PORT || 3100;

app.use(
    bodyParser.urlencoded({
        extended:true
    })
);

app.use(bodyParser.json());

//use the cors module
app.use(cors());

//get path to the client application's splash page
//note this does not get created unless you run
//"ng build" on the angular-cli app
app.use(express.static(path.join(__dirname, 'client')));

//call the reservationRouter router
reservationRouter = require('./routes/reservationRouter')(Reservation);
//initialize end-point via express

//define endpoint schema
app.use('/api/courses/', reservationRouter);

//this is the starting endpoint when we launch our app.
//you "hit" this and then the function runs
//req is the request by the client, res is the server response
app.get('/', function(req, res) {
    res.send("Welcome to the golf course reservation system");
    //res.sendFile(__dirname+ '/src/index.html');
});

app.listen(port, function() {
    console.log("\nGulp is running my app on PORT:" + port);
});