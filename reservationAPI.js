db.golfcourses.insert([
    {
        facility: 'Facility 001',
        _id: new ObjectId(),
        facilityPrice: '$10.00',
        reservations: [{
            _id: new ObjectId(),
            customerName: 'Jack',
            passWord: 'x1234',
            date: '04/25//2016',
            time: '12:00pm',
            equipments: [{
                _id: new ObjectId(),
                equipmentName: 'equipment a54',
                price: '$7.00'
            }]
        }]
    },
    {
        facility: 'Facility 002',
        _id: new ObjectId(),
        facilityPrice: '$10.00',
        reservations: [{
            _id: new ObjectId(),
            customerName: 'Sam',
            passWord: 'x5678',
            date: '04/26//2016',
            time: '2:00pm',
            equipments: [{
            _id: new ObjectId(),
                equipmentName: 'equipment b98',
                price: '$5.00'
            }]
        }]
    },
    {
        facility: 'Facility 003',
        _id: new ObjectId(),
        facilityPrice: '$10.00',
        reservations: [{
            _id: new ObjectId(),
            customerName: 'Luis',
            passWord: 'x101112',
            date: '04/27//2016',
            time: '12:30pm',
            equipments: [{
            _id: new ObjectId(),
                equipmentName: 'equipment c65',
                price: '$6.00'
            }]
        }]
    }
])