import { Component, OnInit } from '@angular/core';
import { APIMiddleWare } from '../../services/api-middleware.service';
import { Router } from '@angular/router';
//we need the form group and formcontrol modules to allow data
//extraction from form submissions
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reservationnavemenu',
  templateUrl: './reservationnavemenu.component.html',
  styleUrls: ['./reservationnavemenu.component.css']
})
export class ReservationnavemenuComponent implements OnInit {
    //reservation:Array<Object>;
    facilityId: String;
    
    equipmentArray = [{
        equipmentName : '',
        price: ''
    }]
    
    //make the form object
    public newReservationForm = new FormGroup({
        customerName: new FormControl("name"),
        date: new FormControl("date"),
        time: new FormControl("time"),
        walkRide: new FormControl("walkRide"),
        equipmentName: new FormControl("equipmentName"),
        price : new FormControl("price"),
        equipments: new FormControl(this.equipmentArray)
    });
    
    
    
    constructor(
        private apiMiddleWare: APIMiddleWare,
        private router:Router
    ) { }

    ngOnInit() {
        this.facilityId = window.location.pathname;
        //console.log("Last index of \\ occurs at: " + this.facilityId.lastIndexOf('/'));
        //console.log("facilityId should be: " + this.facilityId.substring(this.facilityId.lastIndexOf('/')+1));
        this.facilityId = '/facilities/'+this.facilityId.substring(this.facilityId.lastIndexOf('/')+1);
    }
    
    /**
     * API Middleware functions
     **/
     submitNewReservation(even) {
        console.log("User wants to submit reservation");
        //console.log(this.demo[0]['equipmentName']);
        //console.log(this.newReservationForm.value['equipmentName']);
        //console.log(this.newReservationForm.value);
        this.equipmentArray[0]['equipmentName'] = this.newReservationForm.value['equipmentName'];
        this.equipmentArray[0]['price'] = this.newReservationForm.value['price'];
        //console.log(this.newReservationForm.value);
        this.apiMiddleWare.addNewReservation(this.facilityId.substring(this.facilityId.lastIndexOf('/')+1), this.newReservationForm.value);
     }
     
     
}
