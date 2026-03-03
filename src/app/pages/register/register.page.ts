import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonCard, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardTitle, IonButton, IonInput} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth';

import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonCard, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardTitle, IonButton, IonInput]
})
export class RegisterPage implements OnInit {

  constructor( private authService: AuthService, private router: Router, private alertController: AlertController ) { 

  }

  ngOnInit() {
    console.log("La página de registro se ha cargado correctamente");
  }

  @ViewChild('registroForm') registroForm!: NgForm;

  onRegister(){
    const { nombre, email, password } = this.registroForm.value

    this.authService.registrarUsuario(nombre, email, password)
    .then(async (res) => {
      // ÉXITO
      const alertaExito = await this.alertController.create({
        header: '¡Bienvenido!',
        message: 'Tu cuenta en BuscaHuella ha sido creada.',
        buttons: ['Aceptar']
      });
      await alertaExito.present();
      
      // Aquí puedes añadir tu redirección al login o home
    })
    .catch(async (error) => {
      // ERROR
      if (error.code === 'auth/email-already-in-use') {
        const alertaError = await this.alertController.create({
          header: 'Error en registro',
          message: 'Este correo ya está registrado.',
          buttons: ['Reintentar']
        });
        await alertaError.present();
      }
    });
  }

  goToLogin(){
    this.router.navigateByUrl('/login');
  }



}
