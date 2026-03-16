import { Component, OnInit, inject } from '@angular/core';
import {IonMenu, IonImg, IonCardContent, IonContent, IonTitle, IonToolbar, IonHeader, IonList, IonLabel, IonMenuToggle, IonItem, IonButton, IonIcon} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, mapOutline, businessOutline, bandageOutline} from 'ionicons/icons';
import { Router } from '@angular/router';

addIcons({
  'home-outline': homeOutline,
  'map-outline': mapOutline,
  'medkit-outline': businessOutline,
  'bandage-outline': bandageOutline,
});

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  standalone: true,
  imports: [IonMenu, IonImg, IonContent, IonTitle, IonToolbar, IonHeader,IonList, IonLabel, IonMenuToggle, IonCardContent, IonItem, IonButton, IonIcon]
})
export class MenuBarComponent  implements OnInit {
  private router = inject(Router);

  constructor() { }

  ngOnInit() {}

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToMapa() {
    this.router.navigate(['/mapa-busqueda']);
  }

}
