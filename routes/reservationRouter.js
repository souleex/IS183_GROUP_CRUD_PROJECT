var express = require('express');

var routes = function(Reservation) {

    var reservationRouter = express.Router();
    
    reservationRouter.route('/')
        //actually creates an entirely new facility and not only a new reservation
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

        //update an entire facility's data
        .put(function(req, res) {
            
            req.golfcourse.facility = req.body.facility;
            req.golfcourse.facilityPrice = req.body.facilityPrice;
            req.golfcourse.reservations = req.body.reservations;
            /**
            req.golfcourse.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                }else{
                    res.json(req.golfcourse);
                }
            });
            **/
            res.json(req.golfcourse);
                
        })
        
        //update a facility's specific information
        .patch(function(req, res) {
            //don't update the id
            if (req.body._id) {
                delete req.body._id;
            }
            //iterate through the element of the body and assign it to the golfdata
            for (var i in req.body) {
                req.golfcourse[i] = req.body[i];
            }
            
            /**
            req.golfcourse.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                }else{
                    res.json(req.golfcourse);
                }
            });
            **/
            res.json(req.golfcourse);
        })
        
        //allows for deletion of entire facilities
        .delete(function(req, res) {
            var tmpFacility = req.golfcourse;
            req.golfcourse.remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                }else{
                    //console.log("Successfully removed the facility");
                    res.status(404).send("Successfully removed " + tmpFacility.facility);
                }
            });
        });

    //allow to filter for a specific reservation from a facility
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

        //update an entire specific reservation from a specific facility
        .put(function(req, res) {
            //loop through a facility's reservations until a user id matches the requested id
            try {
                var index = -1;
                for (var i=0; i<req.golfcourse.reservations.length; i++ ) {
                    if ( req.golfcourse.reservations[i].reservationID == req.params.reservationId ) {
                        index = i;
                        console.log("Successfully found the reservation");
                    }
                }
                    if (index > -1) {
                        //only allow updates of valid fields
                        for (var i in req.body) {
                            req.golfcourse.reservations[index][i] = req.body[i];
                            //console.log("Updating <"+req.golfcourse.reservations[index][i] +"> to <"+req.body[i]+">");
                        }
                        res.json(req.golfcourse.reservations[index]);
                    }else{
                        res.status(404).send("Cannot update the requested reservation because it does not exist.");
                    }
            }catch(error){
                console.log("Express Fatal " + error);
            }
        })
        
        //update a specific information of a specific reservation from a specific facility
        .patch(function(req, res) {
            //loop through a facility's reservations until a user id matches the requested id
            try {
                var index = -1;
                for (var i=0; i<req.golfcourse.reservations.length; i++ ) {
                    if ( req.golfcourse.reservations[i].reservationID == req.params.reservationId ) {
                        index = i;
                        console.log("Successfully found the reservation");
                    }
                }
                    if (index > -1) {
                        //automatically delete the id so we don't accidentally update it
                        if (req.body._id) {
                            delete req.body._id;
                        }
                        
                        //only allow updates of valid fields
                        for (var i in req.body) {
                            //console.log("Updating <"+req.golfcourse.reservations[index][i]+"> to <"+req.body[i]+">");
                            req.golfcourse.reservations[index][i]=req.body[i];
                        }
                        
                        /**
                        req.golfcourse.save(function(err) {
                            if (err) {
                                res.status(500).send(err);
                            }else{
                                res.json(req.golfcourse);
                            }
                        });
                        **/
                        res.json(req.golfcourse.reservations[index]);
                    }else{
                        res.status(404).send("Cannot update the requested reservation because it does not exist.");
                    }
            }catch(error){
                console.log("Express Fatal " + error);
            }
        })
        /**/
        //allows for deletion of a specific reservation from a facility
        .delete(function(req, res) {
            var index = -1;
            var tmpReservation = "UNKNOWN";
            
            for (var i=0; i<req.golfcourse.reservations.length; i++ ) {
                if ( req.golfcourse.reservations[i].reservationID == req.params.reservationId ) {
                    index = i;
                    console.log("Successfully found the reservation");
                }
            }
            
            tmpReservation = req.golfcourse.reservations[index];
            
            req.golfcourse.reservations[index].remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                }else{
                    //delete the array element
                    req.golfcourse.reservations.splice(index,1);
                    //then we need to save it
                    /**
                    req.golfcourse.save(function(err) {
                        if (err) {
                            res.status(500).send(err);
                        }else{
                            res.json(req.golfcourse);
                        }
                    });
                    **/
                    console.log("Successfully removed the facility");
                    //res.json(req.golfcourse);
                }
            });
            
        });
        /**/
    return reservationRouter;
}

module.exports = routes;