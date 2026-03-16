import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonCard, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardTitle, IonButton, IonInput, IonAvatar} from '@ionic/angular/standalone';
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
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonCard, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardTitle, IonButton, IonInput, IonAvatar]
})
export class RegisterPage implements OnInit {
  // Lista de avatares disponibles (pueden ser locales o URLs)
  avatares = [
    'https://ionicframework.com/docs/img/demos/avatar.svg',
    'https://xsgames.co/randomusers/assets/avatars/female/1.jpg', 
    'https://xsgames.co/randomusers/assets/avatars/male/2.jpg',   
    'https://api.dicebear.com/7.x/bottts/svg?seed=Felix'         
  ];
  avatarSeleccionado: string; // comienza en blanco

  seleccionar(url: string) {
    this.avatarSeleccionado = url;
  }
  constructor( private authService: AuthService, private router: Router, private alertController: AlertController) { 
    this.avatarSeleccionado = this.avatares[0];
  }

  ngOnInit() {
    console.log("La página de registro se ha cargado correctamente");
  }

  @ViewChild('registroForm') registroForm!: NgForm;

  onRegister(){
    const { nombre, email, password } = this.registroForm.value

    const fotoPerfil = this.avatarSeleccionado;

    this.authService.registrarUsuario(fotoPerfil, nombre, email, password)
    .then(async (res) => {
      // ÉXITO
      const alertaExito = await this.alertController.create({
        header: '¡Bienvenido!',
        message: 'Tu cuenta en BuscaHuella ha sido creada,  por favor verifica tu email.',
        buttons: ['Aceptar']
      });
      this.registroForm.reset(); 
      await alertaExito.present();
    
      // Aquí puedes añadir tu redirección al login o home
      this.router.navigate(['/login']);
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
      }else if (error.code === 'auth/weak-password') {
        const alertaError = await this.alertController.create({
          header: 'Error en registro',
          message: 'La contraseña debe tener al menos 6 caracteres.',
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
