import { Component, OnInit } from '@angular/core';
import { APIMiddleWare } from '../../services/api-middleware.service';
import { Router } from '@angular/router';
//we need the form group and formcontrol modules to allow data
//extraction from form submissions
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ViewAReservation',
  templateUrl: './view-a-reservation.component.html',
  styleUrls: ['./view-a-reservation.component.css']
})

export class ViewAReservationComponent implements OnInit {
    //to store the reservation info when a user wants to edit a reservation
    reservation:Array<Object>;
    
    //to store which facility the reservation came from
    facilityId: String;
    
    //to store the reservationId of the reservation the user wants to edit
    reservationId: String;
    
    //to check what mode the user is in (edit or add)
    userMode: String;
    
    //setup equipments being sold as key-value pairs
    equipmentsSold = [
        {
            'equipmentId': 0,
            'equipmentName': "Golfballs (Set of 10)",
            'price':5.99
        },
        {
            'equipmentId': 1,
            'equipmentName': "Golfcart",
            'price': 199.99
        },
        {
            'equipmentId': 2,
            'equipmentName': "Golfclub",
            'price': 50.99
        },
        {
            'equipmentId': 3,
            'equipmentName': "Golf Bag",
            'price': 30.99
        },
        {
            'equipmentId': 4,
            'equipmentName': "Golfclub Headcovers",
            'price': 3.99
        },
        {
            'equipmentId': 5,
            'equipmentName': "Tees (Pack of 50)",
            'price': 24.99
        }
    ];
    
    //create the formGroup variable
    //we will initialize it inside the constructor
    public newReservationForm: FormGroup;
    
    constructor(
        private apiMiddleWare: APIMiddleWare,
        private router:Router,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        //grab current URI scheme
        let currURL = window.location.pathname;
        //console.log(currURL);
        
        //search for where the facility id and the reservation id is
        let facilityIdReservationId = currURL.substring(this.getStringPosition(currURL, '/', 2)+1);
        console.log('view-a-reservations.component.ts:\nFacility and Reservation ID:', facilityIdReservationId);
        
        //get if the user is editing or adding a reservation
        this.userMode = currURL.substring(1, this.getStringPosition(currURL, '/', 2));
        console.log('view-a-reservations.component.ts:\nUser Mode: ', this.userMode);
        
        //split the facilityId and the reservationId into their own strings
        this.facilityId = facilityIdReservationId.substring(0, this.getStringPosition(facilityIdReservationId,'/', 1));
        console.log('view-a-reservations.component.ts:\nFacility ID:', this.facilityId);
        
        this.reservationId = facilityIdReservationId.substring(this.getStringPosition(facilityIdReservationId,'/', 1)+1);
        console.log('view-a-reservations.component.ts:\nReservation ID:', this.reservationId);
        
        //check if the page URI was obtained from a valid-endpoint. If not, redirect the user back to the view-all-facilities page
        this.getReservations().then((resp) => {
            console.log('view-a-reservations.component.ts:\nAPIMiddleWare Response: ', resp);
            
            if (!resp) {
                console.log('view-a-reservations.component.ts:\nRerouting user from bad entry-point: ');
                this.router.navigate(['/facilities/']);
            }else{
                console.log('view-a-reservations.component.ts:\nAPIMiddleWare found valid object(s)');
            }
        });
        
        //create our reservation form fields
        this.newReservationForm = this.formBuilder.group({
            customerName: [,Validators.required],
            date: [,Validators.required],
            walkRide: [,Validators.required],
            //equipments will become an array of equipments
            equipments: this.formBuilder.array([
                this.initNewEquipmentsInput()
            ])
        });
        
        if (this.userMode=='editreservation') {
            //get a single reservation
            this.getReservation(this.facilityId, this.reservationId)
            .then((resp) => {
                this.reservation = resp;
                
                //now assign them to the new form here
                //we do this here since the http get request is async (happens after initial forms load)
                //and the reservation array is undefined until then
                this.newReservationForm = this.formBuilder.group({
                    customerName: [this.reservation['customerName'],Validators.required],
                    date: [this.dateFormat(this.reservation['date']),Validators.required],
                    walkRide: [this.reservation['walkRide'],Validators.required],
                    //equipments will become an array of equipments
                    equipments: this.formBuilder.array([
                        //add in the initial equipment bought
                        this.initExistingEquipmentsInput(this.reservation['equipments'][0].equipmentId)
                    ])
                });
                
                //now add the the rest of the equipment bought
                for (var i = 1; i < this.reservation['equipments'].length; i++) {
                    this.addExistingEquipmentInput(this.reservation['equipments'][i].equipmentId);
                }
            });
        }
    }
    
    /**
     * functions to allow an array of input
     **/
    initNewEquipmentsInput(){
        return this.formBuilder.group({
            equipment:[]
        });
    }
    
    addNewEquipmentInput(){
        const control = <FormArray>this.newReservationForm.controls['equipments'];
        control.push(this.initNewEquipmentsInput());
    }
    
    removeNewEquipmentInput(i){
        const control = <FormArray>this.newReservationForm.controls['equipments'];
        control.removeAt(i);
    }
    
    initExistingEquipmentsInput(equipmentId) {
        return this.formBuilder.group({
            equipment:[equipmentId]
        });
    }
    
    addExistingEquipmentInput(equipmentId){
        const control = <FormArray>this.newReservationForm.controls['equipments'];
        control.push(this.initExistingEquipmentsInput(equipmentId));
    }
    /**
     * API Middleware functions
     **/
    getReservations() {
        return this.apiMiddleWare.getReservations(this.facilityId);
    }
    
    getReservation(facilityId, reservationId) {
        return this.apiMiddleWare.getReservation(facilityId, reservationId);
    }
    
    submitNewReservation(event) {
        console.log("view-a-reservations.component.ts:\nUser wants to submit reservation");
        //console.log(this.newReservationForm.value['equipmentName']);
        
        /** PERFORM CRAZY ASS NESTED FOR-LOOP TO PASS CORRECT DATA BACK TO THE SERVER ***********************************\
         * have to pass this.newReservationForm.value['equipments'] as an object of objects and not array of objects
         * so we perform a crazy loop to see if the equipmentId we got from the user input matches one of the items
         * we're selling, and then we need to replace the slot the user submitted equipmentId resides in with the entire
         * equipment itself.
         ****************************************************************************************************************/
        let index = 0;
        for (var i = 0; i < this.newReservationForm.value['equipments'].length; i++) {
           for (var j = 0; j < this.equipmentsSold.length; j++ ) {
              if (this.newReservationForm.value['equipments'][i]['equipment'] == this.equipmentsSold[j]['equipmentId'] ) {
                  this.newReservationForm.value['equipments'][i] = this.equipmentsSold[j];
                  index+=1;
              }
           }
        }
        if (index > 0) {
           console.log("view-a-reservations.component.ts:\nAble to successfully match " + index + " equipments");
        }else{
           console.log("view-a-reservations.component.ts:\nCould not successfully match equipments");
        }
        
        console.log("view-a-reservations.component.ts:\n\"newReservationForm\" contains: ", this.newReservationForm.value);
        
        this.apiMiddleWare.addNewReservation(this.facilityId.substring(this.facilityId.lastIndexOf('/')+1), this.newReservationForm.value)
        .then( (resp) => {
            console.log('view-a-reservations.component.ts:\nAdd Reservation Response:', resp);
            if ( resp ) {
                this.router.navigate(['/facilities/'+this.facilityId]);
            }
        });
    }
    
    submitEditReservation(event, facilityId, reservationId) {
        console.log("view-a-reservations.component.ts:\nUser wants to edit reservation: " + reservationId + " from facility: " + facilityId);
        
        /** PERFORM CRAZY ASS NESTED FOR-LOOP TO PASS CORRECT DATA BACK TO THE SERVER ***********************************\
         * have to pass this.newReservationForm.value['equipments'] as an object of objects and not array of objects
         * so we perform a crazy loop to see if the equipmentId we got from the user input matches one of the items
         * we're selling, and then we need to replace the slot the user submitted equipmentId resides in with the entire
         * equipment itself.
         ****************************************************************************************************************/
        let index = 0;
        for (var i = 0; i < this.newReservationForm.value['equipments'].length; i++) {
           for (var j = 0; j < this.equipmentsSold.length; j++ ) {
              if (this.newReservationForm.value['equipments'][i]['equipment'] == this.equipmentsSold[j]['equipmentId'] ) {
                  this.newReservationForm.value['equipments'][i] = this.equipmentsSold[j];
                  index+=1;
              }
           }
        }
        if (index > 0) {
           console.log("view-a-reservations.component.ts:\nAble to successfully match " + index + " equipments");
        }else{
           console.log("view-a-reservations.component.ts:\nCould not successfully match equipments");
        }
        
        console.log("view-a-reservations.component.ts:\n\"newReservationForm\" contains: ", this.newReservationForm.value);
        
        this.apiMiddleWare.editReservation(facilityId, reservationId, this.newReservationForm.value)
        .then( (resp) => {
            console.log('view-a-reservations.component.ts:\nEdit Reservation Response:', resp);
            if ( resp ) {
                this.router.navigate(['/facilities/'+this.facilityId]);
            }
        });
    }
    
    /**
     * User interaction buttons
     **/
    backButton(event, param) {
        this.router.navigate(['/facilities/'+this.facilityId]);
    }
    
    /**
     * utility functions
     **/
     //this function makes it easier to find substrings for the URI or other string object
    getStringPosition(myString, subString, index) {
       return myString.split(subString, index).join(subString).length;
    }
    
    //returns a human readable date in the format of DD/MM/YYYY SS
    dateFormat(myDate) {
        //console.log("Date In: ", myDate);
        let dateOut = new Date(myDate.substring(0, this.getStringPosition(myDate, ':', 2)));
        
        let dateOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        
        //console.log("Date Out: ", dateOut.toLocaleString('en-US', dateOptions).replace(/,/,''));
        return dateOut.toLocaleString('en-US', dateOptions).replace(/,/,'');
    }
}
