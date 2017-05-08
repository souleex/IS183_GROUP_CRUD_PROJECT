var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//we use a schema to allow us to define
//how our json obj will look like.
//it should be similar to your mongodb
//data format

//define how your json object will look like
var reservationModel = new Schema({
    facility: {
        type: String
    },
    facilityPrice: {
        type: Number
    },
    reservations: [{
        customerName: {
            type: String
        },
        date: {
            type: Date
        },
        walkRide: {
            type: String
        },
        equipments: [{
            equipmentName: {
                type: String
            },
            price: {
                type: Number
            }
        }]
    }],
});

//for some reason, you have to name your json model as the singular version
//of your imported mongodb:
/**    //mongodb name
    db.golfcourses.insert([
        {
            facility: 'Facility 003',
            facilityPrice: '$10.00',
            equipments: [{
                equipmentName: 'equipment 003',
                price: '$5.00'
            }],
            reservations: [{
                customerName: 'Jack',
                date: '04/25//2016'
            }]
        }
    ])
 **/
module.exports = mongoose.model('GolfCourse', reservationModel);