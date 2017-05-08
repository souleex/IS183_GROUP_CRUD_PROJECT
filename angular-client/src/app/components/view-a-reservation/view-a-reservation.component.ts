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
        this.facilityId = '/facilities/'+ this.facilityId.substring(this.facilityId.lastIndexOf('/')+1);
        
        this.getReservations().then((resp) => {
            console.log('view-a-reservations.component.ts:\nAPIMiddleWare Response: ', resp);
            if (!resp) {
                console.log('view-a-reservations.component.ts:\nRerouting user from bad entry-point: ');
                this.router.navigate(['/facilities/']);
            }else{
                console.log('view-a-reservations.component.ts:\nAPIMiddleWare found valid object(s)');
            }
        });
    }
    
    /**
     * API Middleware functions
     **/
    getReservations() {
        return this.apiMiddleWare.getReservations(window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1));
    }
    
     submitNewReservation(even) {
        console.log("view-a-reservations.component.ts:\nUser wants to submit reservation");
        //console.log(this.demo[0]['equipmentName']);
        //console.log(this.newReservationForm.value['equipmentName']);
        //console.log(this.newReservationForm.value);
        this.equipmentArray[0]['equipmentName'] = this.newReservationForm.value['equipmentName'];
        this.equipmentArray[0]['price'] = this.newReservationForm.value['price'];
        console.log("view-a-reservations.component.ts:\nInformation that will be saved:\n"+this.newReservationForm.value);
        this.apiMiddleWare.addNewReservation(this.facilityId.substring(this.facilityId.lastIndexOf('/')+1), this.newReservationForm.value);
     }
     
     
}
