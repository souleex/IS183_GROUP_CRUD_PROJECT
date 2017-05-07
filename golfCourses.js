db.golfcourses.insert([
    {
        facility: 'Facility 001',
        facilityPrice: '$10.00',
        reservations: [{
            reservationID: '001',
            customerName: 'Jack',
            passWord: 'x1234',
            custID: 'x54',
            date: '04/25//2016',
            time: '12:00pm',
            equipments: [{
                equipmentName: 'equipment a54',
                price: '$7.00'
            }]
        }]
    },
    {
        facility: 'Facility 002',
        facilityPrice: '$10.00',
        reservations: [{
            reservationID: '002',
            customerName: 'Sam',
            passWord: 'x5678',
            custID: 'x12',
            date: '04/26//2016',
            time: '2:00pm',
            equipments: [{
                equipmentName: 'equipment b98',
                price: '$5.00'
            }]
        }]
    },
    {
        facility: 'Facility 003',
        facilityPrice: '$10.00',
        reservations: [{
            reservationID: '003',
            customerName: 'Luis',
            passWord: 'x101112',
            custID: 'x98',
            date: '04/27//2016',
            time: '12:30pm',
            equipments: [{
                equipmentName: 'equipment c65',
                price: '$6.00'
            }]
        }]
    }
])