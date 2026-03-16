import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Database {
  private firestore = inject(Firestore);


  agregarMascota(mascota: any) {
    const mascotasRef = collection(this.firestore, 'mascotas');
    return addDoc(mascotasRef, mascota);
  }

  obtenerMascotas(): Observable<any[]> {
    const mascotasRef = collection(this.firestore, 'mascotas');
    // collectionData ahora funcionará porque reconoce el objeto firestore de Angular
    return collectionData(mascotasRef, { idField: 'id' }) as Observable<any[]>;
  }

  async eliminarMascota(id: string) {
    // Aquí iría la lógica para eliminar la mascota de Firebase
    const mascotaDocRef = doc(this.firestore, `mascotas`, id);
    console.log('Eliminar mascota con ID:', id);
    return await deleteDoc(mascotaDocRef);
  }

  async editarMascota(id: string, datosActualizados: any) {
    // Aquí iría la lógica para editar la mascota en Firebase
    const mascotaUpdateRef = doc(this.firestore, `mascotas`, id);
    return await updateDoc(mascotaUpdateRef, datosActualizados);
  }
}