import { Component, OnInit } from '@angular/core';
//import your service in so it can interact with the component
import { APIMiddleWare } from '../../services/api-middleware.service';
import { Router } from '@angular/router';
//ghetto way to import external JS for a component
import '../../../js/reservations_jquery.js';
@Component({
  selector: 'app-reservationsnavmenu',
  templateUrl: './reservationsnavmenu.component.html',
  styleUrls: ['./reservationsnavmenu.component.css']
})
export class ReservationsnavmenuComponent implements OnInit {
    
  reservations:Array<Object>;
  facilityId: String;
  //inject the service into the constructor
  constructor(
    private apiMiddleWare: APIMiddleWare,
    private router:Router
  ) { }
  
  ngOnInit() {
    this.getReservations().then((resp) => {
        this.reservations = resp;
    });
  }
    
    getReservations() {
        return this.apiMiddleWare.getReservations(this.facilityId);
    }
}
