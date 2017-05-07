/**
 * This file contains all the functions needed to actually
 * have the angular app talk to the server
 **/

import { Component, Injectable } from '@angular/core';
//import http modules and rxjs
import {Http, Headers} from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs';

@Injectable()
export class APIMiddleWare {

    constructor(
        private http: Http,
        private router: Router
    ) { }

    //function to get all facilities from the db
    getFacilities(): Promise<Array<Object>> {
        return this.http.get('http://localhost:8100/api/courses').toPromise().then((resp) => {
            let facilities = resp.json();
            console.log('facilities: ',facilities);
            return facilities;
        });
    }

    getReservations(facilityId): Promise<Array<Object>> {
        return this.http.get('http://localhost:8100/api/courses/'+facilityId).toPromise().then((resp) => {
            let reservations = resp.json();
            console.log('reservations: ', reservations['reservations']);
            return reservations['reservations'];
        });
    }
    
    deleteReservation(facilityId, reservationId) {
        return this.http.delete('http://localhost:8100/api/courses/'+facilityId+'/'+reservationId).toPromise().then((resp) => {
            let deletion = resp.json();
            console.log(deletion);
            window.location.reload();
        });
    };

}
