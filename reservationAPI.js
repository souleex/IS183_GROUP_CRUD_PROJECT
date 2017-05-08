db.golfcourses.insert([
    {
        facility: 'Facility 001',
        _id: new ObjectId(),
        facilityPrice: 8.50,
        reservations: [{
            _id: new ObjectId(),
            customerName: 'Jack',
            date: new Date(),
            walkRide: 'Walk',
            equipments: [{
                _id: new ObjectId(),
                equipmentName: 'equipment a54',
                price: 7.00
            }]
        }]
    },
    {
        facility: 'Facility 002',
        _id: new ObjectId(),
        facilityPrice: 7.00,
        reservations: [{
            _id: new ObjectId(),
            customerName: 'Sam',
            date: new Date(),
            walkRide: 'Ride',
            equipments: [{
            _id: new ObjectId(),
                equipmentName: 'equipment b98',
                price: 5.00
            }]
        }]
    },
    {
        facility: 'Facility 003',
        _id: new ObjectId(),
        facilityPrice: 10.00,
        reservations: [{
            _id: new ObjectId(),
            customerName: 'Luis',
            date: new Date(),
            walkRide: 'Ride',
            equipments: [{
            _id: new ObjectId(),
                equipmentName: 'equipment c65',
                price: 6.25
            }]
        }]
    }
])