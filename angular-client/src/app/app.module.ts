/**
 * Main angular class for importing other components and services
 **/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//import form module for getting form data
import { ReactiveFormsModule } from '@angular/forms';

//import our router modules
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

/**
 * all custom components go here
 **/
//ViewAllFacilitiesComponent should allow a user to select available
//facilities
import { ViewAllFacilitiesComponent } from './components/view-all-facilities/view-all-facilities.component';
//ViewAllReservationsComponent should display all reservations
//at a facility
import { ViewAllReservationsComponent } from './components/view-all-reservations/view-all-reservations.component';
//ViewAReservationComponent should allow a user to edit or add a
//new reservation
import { ViewAReservationComponent } from './components/view-a-reservation/view-a-reservation.component';
//what the user sees as the splash page
import { LoginComponent } from './components/login/login.component';

/**
 * import your services here. Services are functions used to get information
 **/
//from another source
import { APIMiddleWare } from './services/api-middleware.service';

//initialize an array containing all the routes the app will use
//and which component will handle that route.
//these paths are independant of the back-end
var appRoutes: Routes = [
    {
        //which URI path this route is.
        //the empty path should be used for the
        //facility selection [main] navmenu
        path: '',
        //which component handles this URI path
        component: LoginComponent
    },
    {
        path: 'facilities',
        component: ViewAllFacilitiesComponent
    },
    {
        path: 'facilities/:facilityId',
        component: ViewAllReservationsComponent
    },
    {
        path: 'addreservation/:facilityId',
        component: ViewAReservationComponent
    }
]

@NgModule({
//components go here
  declarations: [
    AppComponent,
    LoginComponent,
    ViewAllFacilitiesComponent,
    ViewAllReservationsComponent,
    ViewAReservationComponent
  ],
  //modules go here
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  //services go inside providers
  providers: [
    APIMiddleWare
  ],
  //boostrap is the main/driver appcomponent to load
  bootstrap: [AppComponent]
})
export class AppModule { }
