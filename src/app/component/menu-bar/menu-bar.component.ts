import { Component, OnInit } from '@angular/core';
import {IonMenu, IonImg, IonCardContent, IonContent, IonTitle, IonToolbar, IonHeader} from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  standalone: true,
  imports: [IonMenu, IonImg, IonContent, IonTitle, IonToolbar, IonHeader]
})
export class MenuBarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
