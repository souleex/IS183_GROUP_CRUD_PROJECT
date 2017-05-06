//delcare we need express
var express = require('express');

//declare mongoose so we can turn
//mongodb data into json data
var mongoose = require('mongoose');

//allows express to take the value of whatever is
//in the request body and parse it into a json obj
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/reservationAPI');

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
});

app.listen(port, function() {
    console.log("Gulp is running my app on PORT:" + port);
});