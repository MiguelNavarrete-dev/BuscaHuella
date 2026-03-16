import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonIcon, IonButton, IonTextarea, IonItem, IonSelectOption, IonSelect, IonInput, IonLabel,  IonButtons, IonMenuButton, IonItemDivider, IonAvatar, IonModal} from '@ionic/angular/standalone';
import { pawOutline, cameraOutline, saveOutline, trashOutline, pencil} from 'ionicons/icons';
import { addIcons } from 'ionicons';


import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Database } from 'src/app/services/database';


@Component({
  selector: 'app-gestion-mascotas',
  templateUrl: './gestion-mascotas.page.html',
  styleUrls: ['./gestion-mascotas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonIcon, IonButton, IonTextarea, IonItem, IonSelectOption, IonSelect, IonInput, IonLabel, IonButtons, IonMenuButton, IonItemDivider, IonAvatar, IonModal,CommonModule, FormsModule]
})
export class GestionMascotasPage implements OnInit {

  private database = inject(Database);

  mascotas: any[] = [];

  constructor() { 
    addIcons({ pawOutline, cameraOutline, saveOutline, trashOutline, pencil});
  }

  ngOnInit() {
    this.obtenerMascotas(); // Llama a la función que tiene el subscribe
  }
  nuevaMascota = {
    nombre: '',
    tipo: '',
    descripcion: '',
    imagen: ''
  };

  mascotaAEditar : any ={
    id: '',
    nombre: '',
    tipo: '',
    descripcion: '',
    imagen: ''
  };

  isModalOpen = false;

  obtenerMascotas() {
    this.database.obtenerMascotas().subscribe(data => {
      this.mascotas = data;
      console.log('Mascotas cargadas:', this.mascotas);
    });
  }

  async eliminarMascota(id: string) {
    try {
      await this.database.eliminarMascota(id);
      console.log('Mascota eliminada con ID:', id);
      // Aquí podrías añadir un aviso al usuario: "Borrado con éxito"
    } catch (error) {
      console.error('Error al eliminar mascota:', error);
    }
  }

  async modificarMascota(id: string, datosActualizados: any) {
    try {
      await this.database.editarMascota(id, datosActualizados);
      console.log('Mascota actualizada con ID:', id);
      // Aquí podrías añadir un aviso al usuario: "Actualizado con éxito"
    } catch (error) {
      console.error('Error al actualizar mascota:', error);
    }
  }

  async elegirImagen() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt, // Esto permite elegir entre Cámara y Galería
        promptLabelPhoto: 'Elegir de la galería',
        promptLabelPicture: 'Tomar foto'
      });

      if (image && image.base64String) {
        // Guardamos para mostrar la previsualización
        this.nuevaMascota.imagen = `data:image/jpeg;base64,${image.base64String}`;
      }
    } catch (error) {
      console.log('El usuario canceló la selección');
    }
  }

  async guardarMascota() {
    if (!this.nuevaMascota.nombre) return; // Validación simple
    try {
      const dataParaGuardar = {
        ...this.nuevaMascota,
        fecha: new Date(), // Sello de tiempo real
      };
      await this.database.agregarMascota(dataParaGuardar);
      console.log('¡Guardado en Firebase!');
      
      // Limpiar formulario
      this.nuevaMascota = { nombre: '', tipo: '', descripcion: '', imagen: ''};
      
    } catch (error) {
      console.error('Error al guardar:', error);
    }
    
  }


  async guardarCambios() {
    console.log('Datos en la mesa de trabajo:', this.mascotaAEditar);
    // 1. Sacamos el ID directamente de nuestra variable de edición
    const id = this.mascotaAEditar.id;

    const datosNuevos = {
      nombre: this.mascotaAEditar.nombre,
      tipo: this.mascotaAEditar.tipo,
      descripcion: this.mascotaAEditar.descripcion
    };

    try {
      // 2. Llamamos al servicio
      await this.database.editarMascota(id, datosNuevos);
      
      // 3. ¡EL TOQUE FINAL!: Cerramos el modal automáticamente
      this.isModalOpen = false;
      
      console.log('¡Mascota actualizada con éxito!');
    } catch (error) {
      console.error('Error al editar:', error);
    }
  }

  abrirEditar(mascota: any) {
    // Copiamos los datos para el formulario
    this.mascotaAEditar = { ...mascota };
    
    // Abrimos el modal
    this.isModalOpen = true;
    
    console.log('Formulario listo para editar a:', this.mascotaAEditar.nombre);
  }
}
