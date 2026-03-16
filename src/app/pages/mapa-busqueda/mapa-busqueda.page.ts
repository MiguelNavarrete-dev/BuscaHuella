import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton } from '@ionic/angular/standalone';


declare var google: any;

@Component({
  selector: 'app-mapa-busqueda',
  templateUrl: './mapa-busqueda.page.html',
  styleUrls: ['./mapa-busqueda.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonButton]
})
export class MapaBusquedaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    const coords = { lat: -33.5923, lng: -70.7045 }; // Coordenadas de San Bernardo
    const mapElement = document.getElementById('map');

    const map = new google.maps.Map(mapElement, {
      center: coords,
      zoom: 15,
      mapId: 'TU_MAP_ID_OSCURO' // Solo si creaste el estilo en la consola
    });
  }

}
