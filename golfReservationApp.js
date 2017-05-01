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

//initialize end-point via express
var reservationRouter = express.Router();

reservationRouter.route('/courses')
.post(function(req, res){
    var newReservation = new Reservation(req.body);
    newReservation.save();
    //console.log(newReservation);
    //status 201 = successfully created
    res.status(201).send(newReservation);
})
.get(function(req, res) {
    //allows you to use "?" for query filter
    var query = req.query;
    /*only allow query of valid data name
    if (req.query.facilityPrice) {
        query.facilityPrice = req.query.facilityPrice;
    }else{
        console.log("invalid query");
    }
    */
    Reservation.find(query, function(err, golfcourses) {
        if (err) {
            res.status(500).send(err + ": The server encountered an unexpected condition which prevented it from fulfilling the request.");
        }else{
            res.json(golfcourses);
        }
    });
});
//reservationRouter.use('/courses/:facilityId', function(req.res.next)
//get all reservations from a facility
reservationRouter.route('/courses/:facilityId/')
.get(function(req, res) {
    Reservation.findById(req.params.facilityId, function(err, golfcourse) {
        if (err) {
            res.status(500).send(err + ": The server encountered an unexpected condition which prevented it from fulfilling the request.");
        }else{
            res.json(golfcourse);
        }
    })
})
//update all reservations in a facility
.put(function(req, res) {
    Reservation.findById(req.params.facilityId, function(err, golfcourse) {
        if (err) {
            res.status(500).send(err + ": The server encountered an unexpected condition which prevented it from fulfilling the request.");
        }else{
            golfcourse.facility = req.body.facility;
            golfcourse.facilityPrice = req.body.facilityPrice;
            golfcourse.reservations = req.body.reservations;
            golfcourse.save();
            res.json(golfcourse);
        }
    })
});

//allow to filter for a reservation based off facility and a customer id
reservationRouter.route('/courses/:facilityId/:reservationId')
.get(function(req, res) {
    Reservation.findById(req.params.facilityId, function(err, golfcourse) {
        if (err) {
            res.status(500).send(err + ": The server encountered an unexpected condition which prevented it from fulfilling the request.");
        }else{
            //loop through a facility's reservations until a user id matches the requested id
            for (var i=0; i<golfcourse.reservations.length; i++ ) {
                if (golfcourse.reservations[i].custID == req.params.reservationId) {
                    res.json(golfcourse.reservations[i]);
                }else{
                    res.json("failed");
                }
            }
        }
    })
})

//update an entire facility's information
.put(function(req, res) {
    Reservation.findById(req.params.facilityId, function(err, golfcourse) {
        if (err) {
            res.status(500).send(err + ": The server encountered an unexpected condition which prevented it from fulfilling the request.");
        }else{
            golfcourse.facility = req.body.facility;
            golfcourse.facilityPrice = req.body.facilityPrice;
            golfcourse.reservations = req.body.reservations;
            golfcourse.save();
            res.json(golfcourse);
        }
    })
});

//define endpoint schema
app.use('/api', reservationRouter);

//this is the starting endpoint when we launch our app.
//you "hit" this and then the function runs
//req is the request by the client, res is the server response
app.get('/', function(req, res) {
    res.send("Welcome to the golf course reservation system");
});

app.listen(port, function() {
    console.log("Gulp is running my app on PORT:" + port);
});