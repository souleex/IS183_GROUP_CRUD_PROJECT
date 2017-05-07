import { Component } from '@angular/core';

@Component({
  //selector is what tag to call to use the component
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//component's class
export class AppComponent {
  title = 'app works!';
}
