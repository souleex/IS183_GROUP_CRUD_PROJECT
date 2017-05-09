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
    //reservation:Array<Object>;
    facilityId: String;
    
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
        //grab the facilityId from the current URI so we can pass it into our APIMiddleWare
        this.facilityId = window.location.pathname;
        this.facilityId = '/facilities/'+ this.facilityId.substring(this.facilityId.lastIndexOf('/')+1);
        
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
    
    /**
     * API Middleware functions
     **/
    getReservations() {
        return this.apiMiddleWare.getReservations(window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1));
    }
    
     submitNewReservation(even) {
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
        
        this.apiMiddleWare.addNewReservation(this.facilityId.substring(this.facilityId.lastIndexOf('/')+1), this.newReservationForm.value);
     }
     
     
}
