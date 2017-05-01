var express = require('express');

var routes = function(Reservation) {

    var reservationRouter = express.Router();

    reservationRouter.route('/')
        .post(function(req, res){
            var newReservation = new Reservation(req.body);
            newReservation.save();
            res.status(201).send(newReservation);
        })

        .get(function(req, res) {
            //allows you to use "?" for query filter
            var query = req.query;
            /**
            only allow query of valid data name
            if (req.query.facilityPrice) {
                query.facilityPrice = req.query.facilityPrice;
            }else{
                console.log("invalid query");
            }
            **/
            Reservation.find(query, function(err, golfcourses) {
                if (err) {
                    res.status(500).send(err + ": The server encountered an unexpected condition which prevented it from fulfilling the request.");
                }else{
                    res.json(golfcourses);
                }
            });
        });

    //middleware to pass parameters onto the next endpoint
    reservationRouter.use('/:facilityId', function(req, res, next) {
        Reservation.findById(req.params.facilityId, function(err, golfcourse) {
            if (err) {
                res.status(500).send(err + ": The server encountered an unexpected condition which prevented it from fulfilling the request.");
            }else if( golfcourse ) {
                req.golfcourse = golfcourse;
                next();
            }else{
                res.status(404).send("No such facility");
            }
        })
    });
    
    //get all reservations from a facility
    reservationRouter.route('/:facilityId')
        .get(function(req, res) {
            res.json(req.golfcourse);
        })

        //update all reservations from a facility
        .put(function(req, res) {
            
            req.golfcourse.facility = req.body.facility;
            req.golfcourse.facilityPrice = req.body.facilityPrice;
            req.golfcourse.reservations = req.body.reservations;
            //req.golfcourse.save();
            res.json(req.golfcourse);
                
        });

    //allow to filter for a reservation from a facility
    reservationRouter.route('/:facilityId/:reservationId')
        //get a specific reservation from a specific facility
        .get(function(req, res) {
            try {
                //our band aid solution for searching a non-existing object
                //we'll initialize the index at -1 because arrays can't have
                //a -1 index
                var index = -1;
                for (var i=0; i<req.golfcourse.reservations.length; i++ ) {
                    if ( req.golfcourse.reservations[i].reservationID == req.params.reservationId ) {
                        //then if an element is found we set index to the element's index
                        index = i;
                        console.log("A matching reservation was found");
                    }
                }
                
                //if index is bigger than -1 then we found an object
                if (index > -1) {
                    res.json(req.golfcourse.reservations[index]);
                }else{
                    res.status(404).send("The requested reservation was not found");
                }
            }catch(error){
                console.log("Express Fatal " + error);
            }
        })

        //update a specific reservation from a specific facility
        .put(function(req, res) {
            //loop through a facility's reservations until a user id matches the requested id
            try {
                var index = -1;
                for (var i=0; i<req.golfcourse.reservations.length; i++ ) {
                    if ( req.golfcourse.reservations[i].reservationID == req.params.reservationId ) {
                        index = i;
                        console.log("Sucessfully updated the reservation");
                    }
                }
                    if (index > -1) {
                        req.golfcourse.reservations[index].date = req.body.date;
                        req.golfcourse.reservations[index].time = req.body.time;
                        req.golfcourse.reservations[index].equipments = req.body.equipments;
                        res.json(req.golfcourse.reservations[index]);
                    }else{
                        res.status(404).send("Cannot update the requested reservation because it does not exist.");
                    }
            }catch(error){
                console.log("Express Fatal " + error);
            }
        });
    return reservationRouter;
}

module.exports = routes;