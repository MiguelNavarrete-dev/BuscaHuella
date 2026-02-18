import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonAvatar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonListHeader, IonLabel, IonCardSubtitle, IonFooter, IonSegmentButton, IonIcon, IonMenuButton} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { logoIonic } from 'ionicons/icons';

import { MenuBarComponent } from '../component/menu-bar/menu-bar.component';
import { FooterComponent } from '../component/footer/footer.component'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonAvatar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonListHeader, IonLabel, IonCardSubtitle, IonFooter, IonSegmentButton, IonIcon, MenuBarComponent, FooterComponent, IonMenuButton],
})
export class HomePage {
  constructor() {}
}
