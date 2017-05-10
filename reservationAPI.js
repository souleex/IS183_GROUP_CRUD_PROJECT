db.golfcourses.insert([
    {
        _id: new ObjectId(),
        facility: 'Airways Municipal Golf Course',
        facilityImgURL:'https://image.ibb.co/kV2iqk/zz_JYp_Lm_1.jpg',
        facilityPrice: 8.50,
        reservations: [{
            _id: new ObjectId(),
            customerName: 'Jack',
            date: new Date(),
            walkRide: 'Walk',
            equipments: [{
                _id: new ObjectId(),
                equipmentId: 999,
                equipmentName: 'equipment a54',
                price: 7.00
            }]
        }]
    },
    {
        _id: new ObjectId(),
        facility: 'Sunnyside Country Club',
        facilityImgURL:'https://image.ibb.co/eMMMbQ/9VA4D7Z.png',
        facilityPrice: 7.00,
        reservations: [{
            _id: new ObjectId(),
            customerName: 'Sam',
            date: new Date(),
            walkRide: 'Ride',
            equipments: [{
            _id: new ObjectId(),
                equipmentId: 998,
                equipmentName: 'equipment b98',
                price: 5.00
            }]
        }]
    },
    {
        _id: new ObjectId(),
        facility: "Hank's Swank Par 3 Golf Course",
        facilityImgURL:'https://image.ibb.co/m3RMbQ/MrzayDo.png',
        facilityPrice: 10.00,
        reservations: [{
            _id: new ObjectId(),
            customerName: 'Luis',
            date: new Date(),
            walkRide: 'Ride',
            equipments: [{
            _id: new ObjectId(),
                equipmentId: 997,
                equipmentName: 'equipment c65',
                price: 6.25
            }]
        }]
    }
])