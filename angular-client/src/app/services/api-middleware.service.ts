import { Component, Injectable } from '@angular/core';
//import http modules and rxjs
import {Http, Headers} from '@angular/http';
import 'rxjs';

@Injectable()
export class APIMiddleWare {

  constructor(private http: Http) { }
  
  //function to get all facilities from the db
  getFacilities(): Promise<Array<Object>> {
    return this.http.get('http://localhost:8100/api/courses').toPromise().then((resp) => {
        let facilities = resp.json();
        //console.log(facilities);
        return facilities;
    });
  }
  
  getReservations(facilityId): Promise<Array<Object>> {
        return this.http.get('http://localhost:8100/api/courses/'+facilityId).toPromise().then((resp) => {
            let reservations = resp.json();
            return reservations;
        });
  }
  
}
