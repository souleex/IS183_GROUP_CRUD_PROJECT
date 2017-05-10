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
    private urlString: string;
    constructor(private http: Http, private router: Router) {
        this.urlString = 'http://localhost:8100/api/courses/';
    }

    //function to get all facilities from the db
    getFacilities(): Promise<Array<Object>> {
    return this.http.get(this.urlString).toPromise()
        .then(function successCallback(resp) {
            let facilities = resp.json();
            console.log('api-middleware.service.ts:\nfacilities: ',facilities);
            return facilities;
        }
        ,function errorCallback(resp){
            console.log("api-middleware.service.ts:\nHit bad entry-point");
            return false;
        });
    }

    //get all reservations from a facility
    getReservations(facilityId): Promise<Array<Object>> {
        return this.http.get(this.urlString+facilityId).toPromise()
        .then(function successCallback(resp) {
            let reservations = resp.json();
            console.log('api-middleware.service.ts:\nHit good entry-point\nreservations: ', reservations['reservations']);
            return reservations['reservations'];
        }
        ,function errorCallback(resp){
            console.log("api-middleware.service.ts:\nHit bad entry-point");
            return false;
        });
    }
    
    //grab the reservation information
    getReservation(facilityId, reservationId): Promise<Array<Object>> {
        return this.http.get(this.urlString+facilityId+'/'+reservationId).toPromise()
        .then(function successCallback(resp) {
            let reservation = resp.json();
            console.log('api-middleware.service.ts:\nHit good entry-point\nreservation: ', reservation);
            return reservation;
        }
        ,function errorCallback(resp) {
            console.log("api-middleware.service.ts:\nHit bad entry-point");
            return false;
        });
    }
    
    //add a new reservation into a facility
    addNewReservation(facilityId, dataObj) {
        return this.http.post(this.urlString+facilityId, dataObj).toPromise()
        .then(function successCallback(resp) {
            console.log("api-middleware.service.ts:\nSuccessfully Added Reservation: ", resp);
            return true;
        }
        ,function errorCallback(resp) {
            console.log("api-middleware.service.ts:\nCould Not Add Reservation: ", resp);
            return false;
        });
    }
    
    //edit a reservation at a facility
    editReservation(facilityId, reservationId, dataObj) {
        return this.http.patch(this.urlString+facilityId + '/' + reservationId, dataObj).toPromise()
        .then(function successCallback(resp) {
            console.log("api-middleware.service.ts:\nSuccessfully Updateds Reservation: ", resp);
            return true;
        }
        ,function errorCallback(resp) {
            console.log("api-middleware.service.ts:\nCould Not Update Reservation: ", resp);
            return false;
        });
    }
    
    //delete a reservation from a facility
    deleteReservation(facilityId, reservationId) {
        return this.http.delete(this.urlString+facilityId+'/'+reservationId).toPromise()
        .then(function successCallback(resp) {
            let deleted = resp.json();
            console.log("api-middleware.service.ts:\nSuccessfully Deleted: ", deleted);
            return true;
        }
        ,function errorCallback(resp) {
            console.log("api-middleware.service.ts:\nCould Not Delete");
            return false;
        });
    }
}
