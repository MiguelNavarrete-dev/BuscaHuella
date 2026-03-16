import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons,IonInput, IonList, IonItem, IonCard, IonCardContent, IonBackButton } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth';

import { AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-profille-configuration',
  templateUrl: './profille-configuration.page.html',
  styleUrls: ['./profille-configuration.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons,IonInput, IonList, IonItem, IonCard, IonCardContent, IonBackButton]
})
export class ProfilleConfigurationPage implements OnInit {

  userId: string | null = null; // Cambiado a null para mejor control
  
  //user$: Observable<User | null> = authState(this.AuthService);

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      } else {
        // Redirigir al login si no hay usuario (opcional)
        this.router.navigateByUrl('/login');
      }
    });
  }

  @ViewChild('configProfileForm') configProfileForm!: NgForm;

  async guardarDatosExtra() {
    // 1. Validar que tengamos el ID y que el formulario sea válido
    if (!this.userId) {
      await this.presentarAlerta('Error', 'No se detectó una sesión activa.');
      return;
    }

    if (this.configProfileForm.invalid) {
      await this.presentarAlerta('Formulario incompleto', 'Por favor llena todos los campos requeridos.');
      return;
    }

    // 2. Extraer datos
    const datos = {
      direccion: this.configProfileForm.value.direccion,
      telefono: this.configProfileForm.value.telefono,
      comuna: this.configProfileForm.value.comuna,
      bio: this.configProfileForm.value.bio
    };

    try {
      // 3. Llamar al servicio
      await this.authService.completarPerfil(this.userId, datos);
      
      await this.presentarAlerta('¡Éxito!', 'Perfil actualizado correctamente.');
      this.configProfileForm.reset();
      this.router.navigateByUrl('/profile'); // Redirigir tras éxito

    } catch (error) {
      console.error("Error al guardar:", error);
      await this.presentarAlerta('Error', 'Hubo un problema al guardar en la base de datos.');
    }
  }

  // Método genérico para alertas (reemplaza tu presentarAlertaError)
  async presentarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  editarPerfil() {
    this.router.navigateByUrl('/profile');
  }
}
