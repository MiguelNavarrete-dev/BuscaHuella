import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService{

  private auth = inject(Auth);

  private firestore = inject(Firestore); // Inyecta Firestore

  constructor() { }

  async registrarUsuario(nombre: string, email: string, password: string) {
    const authInstancia = getAuth();
  
    // 1. Intentar crear el usuario
    const userCredential = await createUserWithEmailAndPassword(authInstancia, email, password);
    const uid = userCredential.user.uid; // Este es el ID único del nuevo usuario

    // 2. Guardar el nombre en Firestore
    // IDEA: Crea un documento en la colección 'usuarios' usando el 'uid' como nombre del archivo
    const referenciaAlDocumento = doc(this.firestore, `usuarios/${uid}`);
    
    return setDoc(referenciaAlDocumento, {
      nombreCompleto: nombre,
      email: email,
      fechaRegistro: new Date()
    });
  }

  async loginUser(email: string, password: string) {
    const authInstancia = getAuth();
    return signInWithEmailAndPassword(authInstancia, email, password);
  }

  get currentUser() {
    return this.auth?.currentUser;
  }
}

