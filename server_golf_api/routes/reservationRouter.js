var express = require('express');

var routes = function(Reservation) {

    var reservationRouter = express.Router();
    
    //import your controller
    var reservationController = require ('../controllers/reservationController')(Reservation);
    
    reservationRouter.route('/')
        .post(reservationController.insertNewFacility)
        .get(reservationController.getAllFacilities);

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
        //get all reservations
        .get(reservationController.getAllFacilityData)
        
        //add a new reservation
        .post(reservationController.insertNewReservation)
        
        //update an entire facility's data
        .put(reservationController.updateAllFacilityData)
        
        //update a facility's specific information
        .patch(reservationController.updateSpecificFacilityData)
        
        //allows for deletion of entire facilities
        .delete(reservationController.removeFacility);

    //allow to filter for a specific reservation from a facility
    reservationRouter.route('/:facilityId/:reservationId')
        //get a specific reservation from a specific facility
        .get(reservationController.getReservation)
        
        //update an entire specific reservation from a specific facility
        .put(reservationController.updateEntireReservation)
        
        //update a specific information of a specific reservation from a specific facility
        .patch(reservationController.updateReservation)
        /**/
        //allows for deletion of a specific reservation from a facility
        .delete(reservationController.removeReservation);
        /**/
    return reservationRouter;
}

module.exports = routes;