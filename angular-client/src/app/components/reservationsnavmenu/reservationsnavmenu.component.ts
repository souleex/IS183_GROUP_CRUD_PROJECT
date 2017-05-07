import { Component, OnInit } from '@angular/core';
//import your service in so it can interact with the component
import { APIMiddleWare } from '../../services/api-middleware.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservationsnavmenu',
  templateUrl: './reservationsnavmenu.component.html',
  styleUrls: ['./reservationsnavmenu.component.css']
})
export class ReservationsnavmenuComponent implements OnInit {

    reservations:Array<Object>;
    facilityId: String;
    useGridView: Boolean;
    
    //inject the service into the constructor
    constructor(
        private apiMiddleWare: APIMiddleWare,
        private router:Router
    ) { }

    ngOnInit() {
        this.useGridView = true;
        //console.log("Current Location: " + window.location.pathname);
        this.facilityId = window.location.pathname;
        //console.log("Last index of \\ occurs at: " + this.facilityId.lastIndexOf('/'));
        //console.log("facilityId should be: " + this.facilityId.substring(this.facilityId.lastIndexOf('/')+1));
        this.facilityId = this.facilityId.substring(this.facilityId.lastIndexOf('/')+1);
        this.getReservations().then((resp) => {
            this.reservations = resp;
        });
    }
    
    getReservations() {
        return this.apiMiddleWare.getReservations(this.facilityId);
    }
    
    /**
     * Functions for interaction
     **/
    addNewReservation(event) {
        console.log("Someone wants to add a new reservation");
        this.router.navigate(['/reservation/'+this.facilityId]);
    }
     
    deleteReservation(event, reservationId) {
        console.log("Someone wanted to delete reservation: " + reservationId);
        this.apiMiddleWare.deleteReservation(this.facilityId, reservationId);
        //console.log(this.facilityId);
        //this.router.navigate(['/facilities/'+this.facilityId]);
        //window.location.reload();
    }
    
    reservationsListView(event) {
        console.log("Changing reservations to a list view");
        this.useGridView = false;
    }
    
    reservationsGridView(event) {
        console.log("Changing reservations to a grid view");
        this.useGridView = true;
    }
}
