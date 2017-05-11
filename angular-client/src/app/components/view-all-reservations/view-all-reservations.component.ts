import { Component, OnInit } from '@angular/core';
//import your service in so it can interact with the component
import { APIMiddleWare } from '../../services/api-middleware.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ViewAllReservations',
  templateUrl: './view-all-reservations.component.html',
  styleUrls: ['./view-all-reservations.component.css']
})
export class ViewAllReservationsComponent implements OnInit {

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
        this.facilityId = window.location.pathname;
        this.facilityId = this.facilityId.substring(this.facilityId.lastIndexOf('/')+1);
        this.getReservations();
    }
    /**
     * API Middleware Functions
     **/
    getReservations() {
        return this.apiMiddleWare.getReservations(this.facilityId)
        .then((resp) => {
            this.reservations = resp;
            console.log('view-all-reservations.component.ts:\nAPIMiddleWare Response: ', resp);
            if (!resp) {
                console.log('view-all-reservations.component.ts:\nRerouting user from bad entry-point: ');
                this.router.navigate(['/facilities/']);
            }else{
                console.log('view-all-reservations.component.ts:\nAPIMiddleWare found valid object(s)');
            }
        });
    }

    deleteReservation(event, reservationId) {
        if ( confirm("Are you sure you want to delete this reservation?") ) {
            
            this.apiMiddleWare.deleteReservation(this.facilityId, reservationId)
            .then( (resp) => {
                //console.log('view-all-reservations.component.ts:\nDeletion Response:', resp);
                if ( resp ) {
                    //window.location.reload();
                    //console.log('attempting to refresh page');
                    //refetch data
                    this.getReservations();
                }
            });
            console.log("Should only delete reservation #", reservationId);
        }
    }
    
    /**
     * Functions for interaction
     **/
    addNewReservation(event) {
        console.log("view-all-reservations.component.ts:\nSomeone wants to add a new reservation");
        this.router.navigate(['/addreservation/'+this.facilityId]);
    }
    
    editReservation(event, reservationId) {
        console.log("view-all-reservations.component.ts:\nSomeone wants to edit an existing reservation");
        this.router.navigate(['/editreservation/'+this.facilityId+'/'+reservationId]);
    }
    
    reservationsListView(event) {
        console.log("view-all-reservations.component.ts:\nChanging reservations to a list view");
        this.useGridView = false;
    }
    
    reservationsGridView(event) {
        console.log("view-all-reservations.component.ts:\nChanging reservations to a grid view");
        this.useGridView = true;
    }
}
