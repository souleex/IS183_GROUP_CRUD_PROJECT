import { Component, OnInit } from '@angular/core';
//import your service in so it can interact with the component
import { APIMiddleWare } from '../../services/api-middleware.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mainnavmenu',
  templateUrl: './mainnavmenu.component.html',
  styleUrls: ['./mainnavmenu.component.css']
})
export class MainnavmenuComponent implements OnInit {
   
  facilities:Array<Object>;
  //inject the service into the constructor
  constructor(
    private apiMiddleWare: APIMiddleWare,
    private router:Router
  ) { }

  //default actions when component loads
  ngOnInit() {
    this.getFacilities().then((resp) => {
        //console.log(resp[0]['facility']);
        this.facilities = resp;
    });
  }
  
  getFacilities() {
    return this.apiMiddleWare.getFacilities();
  }

}
