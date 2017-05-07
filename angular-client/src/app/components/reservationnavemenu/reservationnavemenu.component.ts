import { Component, OnInit } from '@angular/core';
import { APIMiddleWare } from '../../services/api-middleware.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservationnavemenu',
  templateUrl: './reservationnavemenu.component.html',
  styleUrls: ['./reservationnavemenu.component.css']
})
export class ReservationnavemenuComponent implements OnInit {
    reservation:Array<Object>;
    facilityId: String;
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

}
