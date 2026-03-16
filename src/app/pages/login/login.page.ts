import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonCard, IonItem, IonList, IonCardContent, IonCardTitle, IonButton, IonInput} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';

import { AlertController } from '@ionic/angular/standalone';
import { user } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonCard, IonItem, IonList, IonCardContent, IonCardTitle, IonButton, IonInput]
})
export class LoginPage implements OnInit {
  verificado: boolean = false;


  constructor(private router: Router, private authService: AuthService, private alertController: AlertController) { }

  ngOnInit() { 
  }

  @ViewChild('loginForm') loginForm!: NgForm;

  loginUsuario() {
    const { email, password } = this.loginForm.value;

    this.authService.loginUser(email, password)
      .then(async (res) => {
        // 1. Si llegamos aquí, las credenciales son correctas
        console.log('Login exitoso', res);
      
        // Verificar si el email ha sido verificado
        if (res.user.emailVerified) {
          this.verificado = true;
          this.router.navigate(['/home']);
          this.loginForm.reset();
        } else {
            this.verificado = false;
            const alerta = await this.alertController.create({
              header: 'Email no verificado',
              message: '¿No recibiste el link? Revisa tu carpeta de spam o solicita uno nuevo.',
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel'
                }
              ]
            });
            await alerta.present();
          }
      })
      .catch(async (error) => {
        // 3. Si falla (clave mal escrita, etc.), mostramos la alerta de Ionic
        const alerta = await this.alertController.create({
          header: 'Error',
          message: 'Email o contraseña incorrectos',
          buttons: ['Aceptar']
        });
        await alerta.present();
      });
  }

  goToRegister(){
    // Aquí lo mandamos a la página de registro
    this.router.navigateByUrl('/register');
  }

 

}
