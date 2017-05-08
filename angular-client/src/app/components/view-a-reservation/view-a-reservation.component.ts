import { Component, OnInit } from '@angular/core';
import { APIMiddleWare } from '../../services/api-middleware.service';
import { Router } from '@angular/router';
//we need the form group and formcontrol modules to allow data
//extraction from form submissions
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ViewAReservation',
  templateUrl: './view-a-reservation.component.html',
  styleUrls: ['./view-a-reservation.component.css']
})
export class ViewAReservationComponent implements OnInit {
    //reservation:Array<Object>;
    facilityId: String;
    
    equipmentArray = [{
        equipmentName : String,
        price: ''
    }]
    
    equipmentPrice: String;
    //make the form object
    public newReservationForm = new FormGroup({
        //not sure exactly how this form thing works, but
        //it looks like each key is a new formcontrol with a
        //default value
        customerName: new FormControl("Your Name"),
        date: new FormControl(new Date().toLocaleString()),
        walkRide: new FormControl("walkRide"),
        equipmentName: new FormControl("equipmentName"),
        price : new FormControl(5.5),
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
        console.log("Information that will be saved:\n"+this.newReservationForm.value);
        this.apiMiddleWare.addNewReservation(this.facilityId.substring(this.facilityId.lastIndexOf('/')+1), this.newReservationForm.value);
     }
     
     
}
