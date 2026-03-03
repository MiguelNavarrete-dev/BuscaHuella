import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Si no usas standalone individualmente
import { AuthService } from '../services/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  private authService = inject(AuthService);
  private firestore = inject(Firestore);

  // Variables para mostrar en el HTML
  userData: any = {
    nombreCompleto: '',
    email: ''
  };

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(this.firestore, `usuarios/${user.uid}`);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          this.userData = userSnap.data();
          this.userData['email'] = user.email; 
        }
      }
    });
  }
}