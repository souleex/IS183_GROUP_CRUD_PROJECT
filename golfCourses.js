db.golfcourses.insert([
    {
        facility: 'Facility 001',
        facilityPrice: '$5.00',
        equipments: [{
            equipmentName: 'equipment 001',
            price: '$3.00'
        }],
        reservations: [{
            customerName: 'Mack',
            date: '04/27//2017'
        }]
    },
    {
        facility: 'Facility 002',
        facilityPrice: '$7.00',
        equipments: [{
            equipmentName: 'equipment 002',
            price: '$2.00'
        }],
        reservations: [{
            customerName: 'Nick',
            date: '04/25//2017'
        }]
    },
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