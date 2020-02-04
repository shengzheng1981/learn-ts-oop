import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'learn-ts-oop';
  menuItems: any = [{
    "text": "Chapter1",
    "link": "/chapter1",
    "icon": "fas fa-dice-one fa-lg"
  },
  {
    "text": "Chapter2",
    "link": "/chapter2",
    "icon": "fas fa-dice-two fa-lg"
  },
  {
    "text": "Chapter3",
    "link": "/chapter3",
    "icon": "fas fa-dice-three fa-lg"
  },
  {
    "text": "Chapter4",
    "link": "/chapter4",
    "icon": "fas fa-dice-four fa-lg"
  }];
  constructor(){
    document.title = this.title;
  }


}
