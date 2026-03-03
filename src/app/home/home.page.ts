import { Component, inject} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonAvatar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonListHeader, IonLabel, IonCardSubtitle, IonFooter, IonSegmentButton, IonIcon, IonMenuButton, IonPopover, IonItem} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { logoIonic, menuOutline } from 'ionicons/icons';

import { MenuBarComponent } from '../component/menu-bar/menu-bar.component';
import { FooterComponent } from '../component/footer/footer.component'

import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonAvatar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonListHeader, IonLabel, IonCardSubtitle, IonFooter, MenuBarComponent, FooterComponent, IonMenuButton, CommonModule, IonPopover, IonItem],
})



export class HomePage{
  nombreCompleto: string = '';
  constructor() {
  addIcons({
    'menu-outline': menuOutline, // 2. Asígnale el nombre que usa el componente internamente
    'logo-ionic': logoIonic,
  });
}
  private auth = inject(AuthService);
  private firestore = inject(Firestore);

async ngOnInit() {
  const auth = getAuth(); 

  // Escuchamos el estado del usuario
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Solo buscamos en Firestore si el usuario existe
      const userDocRef = doc(this.firestore, `usuarios/${user.uid}`);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        // Asignamos el nombre y Angular actualizará el HTML automáticamente
        this.nombreCompleto = userSnap.data()['nombreCompleto'];
      }
    } 
  });
}

}
