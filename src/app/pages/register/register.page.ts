import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonCard, IonLabel, IonThumbnail, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonButton} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonCard, IonLabel, IonThumbnail, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonButton]
})
export class RegisterPage implements OnInit {

  constructor( private router: Router ) { 

  }

  ngOnInit() {
    console.log("La página de registro se ha cargado correctamente");
  }

  onRegister(){
    this.router.navigate(['']);
  }

}
