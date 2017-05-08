var reservationController = function (Reservation) {
    /**
     * For getting and setting entire facilities
     **/
    //actually creates an entirely new facility and not only a new reservation
    var insertNewFacility = function(req, res) {
        var newReservation = new Reservation(req.body);
        newReservation.save();
        res.status(201).send(newReservation);
    }
    
    var getAllFacilities = function(req, res) {
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
        }
        
        /**
         * For getting and setting all facility data, and for removing an entire facility
         **/
        var getAllFacilityData = function(req, res) {
            res.json(req.golfcourse);
        }
        
        var insertNewReservation = function(req, res) {
        //add the new reservation to the end of the reservations array
            try {
                var lastElement = req.golfcourse.reservations.length;
                req.golfcourse.reservations.splice(lastElement,0, req.body);
                
                req.golfcourse.save(function(err) {
                    if (err) {
                        res.status(500).send(err);
                    }else{
                        res.json(1);
                    }
                });
            }catch(error){
                console.log("Express Fatal " + error);
            }
        }
        
        var updateAllFacilityData = function(req, res) {
            
            req.golfcourse.facility = req.body.facility;
            req.golfcourse.facilityPrice = req.body.facilityPrice;
            req.golfcourse.reservations = req.body.reservations;
            /**/
            req.golfcourse.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                }else{
                    res.json(req.golfcourse);
                }
            });
            /**/
            res.json(req.golfcourse);
        }
        
        var updateSpecificFacilityData = function(req, res) {
            //don't update the id
            if (req.body._id) {
                delete req.body._id;
            }
            //iterate through the element of the body and assign it to the golfdata
            for (var i in req.body) {
                req.golfcourse[i] = req.body[i];
            }
            
            /**/
            req.golfcourse.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                }else{
                    res.json(req.golfcourse);
                }
            });
            /**/
        }
        
        var removeFacility = function(req, res) {
            var tmpFacility = req.golfcourse;
            req.golfcourse.remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                }else{
                    //console.log("Successfully removed the facility");
                    res.status(404).send("Successfully removed " + tmpFacility.facility);
                }
            });
        }
        
        /**
         * For getting, setting, and deleting specific reservations from a specific facility
         **/
        var getReservation = function(req, res) {
            try {
                //our band aid solution for searching a non-existing object
                //we'll initialize the index at -1 because arrays can't have
                //a -1 index
                var index = -1;
                for (var i=0; i<req.golfcourse.reservations.length; i++ ) {
                    if ( req.golfcourse.reservations[i]._id == req.params.reservationId ) {
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
        } 
        
        var updateEntireReservation = function(req, res) {
            //loop through a facility's reservations until a user id matches the requested id
            try {
                var index = -1;
                for (var i=0; i<req.golfcourse.reservations.length; i++ ) {
                    if ( req.golfcourse.reservations[i]._id == req.params.reservationId ) {
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
                        //res.json(req.golfcourse.reservations[index]);
                        req.golfcourse.save(function(err) {
                            if (err) {
                                res.status(500).send(err);
                            }else{
                                res.json(req.golfcourse);
                            }
                        });
                    }else{
                        res.status(404).send("Cannot update the requested reservation because it does not exist.");
                    }
            }catch(error){
                console.log("Express Fatal " + error);
            }
        }
        
        var updateReservation = function(req, res) {
            //loop through a facility's reservations until a user id matches the requested id
            try {
                var index = -1;
                for (var i=0; i<req.golfcourse.reservations.length; i++ ) {
                    if ( req.golfcourse.reservations[i]._id == req.params.reservationId ) {
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
                        
                        /**/
                        req.golfcourse.save(function(err) {
                            if (err) {
                                res.status(500).send(err);
                            }else{
                                res.json(req.golfcourse.reservations[index]);
                            }
                        });
                        /**/
                    }else{
                        res.status(404).send("Cannot update the requested reservation because it does not exist.");
                    }
            }catch(error){
                console.log("Express Fatal " + error);
            }
        }
        
        var removeReservation = function(req, res) {
            var index = -1;
            var tmpReservation = "UNKNOWN";
            
            for (var i=0; i<req.golfcourse.reservations.length; i++ ) {
                if ( req.golfcourse.reservations[i]._id == req.params.reservationId ) {
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
                    /**/
                    req.golfcourse.save(function(err) {
                        if (err) {
                            res.status(500).send(err);
                        }else{
                            res.json(true);
                        }
                    });
                    /**/
                    console.log("Successfully removed the reservation");
                    //res.json(req.golfcourse);
                }
            });
        }
         
    return {
        insertNewFacility          : insertNewFacility,
        getAllFacilities           : getAllFacilities,
        //
        getAllFacilityData         : getAllFacilityData,
        insertNewReservation       : insertNewReservation,
        updateAllFacilityData      : updateAllFacilityData,
        updateSpecificFacilityData : updateSpecificFacilityData,
        removeFacility             : removeFacility,
        //
        getReservation             : getReservation,
        updateEntireReservation    : updateEntireReservation,
        updateReservation          : updateReservation,
        removeReservation          : removeReservation
    }
}

module.exports = reservationController;