db.golfcourses.insert([
    {
        facility: 'Facility 001',
        facilityPrice: '$10.00',
        reservations: [{
            reservationID: 'id',
            customerName: 'Jack',
            passWord: 'password',
            custID: 'id',
            date: '04/25//2016',
            time: '12:00pm',
            equipments: [{
                equipmentName: 'equipment 003',
                price: '$5.00'
            }]
        }]
    },
    {
        facility: 'Facility 002',
        facilityPrice: '$10.00',
        reservations: [{
            reservationID: 'id',
            customerName: 'Jack',
            passWord: 'password',
            custID: 'id',
            date: '04/26//2016',
            time: '12:00pm',
            equipments: [{
                equipmentName: 'equipment 003',
                price: '$5.00'
            }]
        }]
    },
    {
        facility: 'Facility 003',
        facilityPrice: '$10.00',
        reservations: [{
            reservationID: 'id',
            customerName: 'Jeff',
            passWord: 'password',
            custID: 'id',
            date: '04/27//2016',
            time: '12:00pm',
            equipments: [{
                equipmentName: 'equipment 003',
                price: '$5.00'
            }]
        }]
    }
])