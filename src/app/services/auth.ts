import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc} from '@angular/fire/firestore';
import { sendEmailVerification, signOut, User } from 'firebase/auth';
import { getFirestore, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService{

  private auth = inject(Auth);

  private firestore = inject(Firestore); // Inyecta Firestore

  user$: Observable<User | null> = authState(this.auth);

  constructor() { }

  async registrarUsuario(fotoPerfil: string, nombre: string, email: string, password: string) {
    const authInstancia = getAuth();
  
    // 1. Intentar crear el usuario
    const userCredential = await createUserWithEmailAndPassword(authInstancia, email, password);
    const uid = userCredential.user.uid; // Este es el ID único del nuevo usuario

    await sendEmailVerification(userCredential.user);

    // 2. Guardar el nombre en Firestore
    const referenciaAlDocumento = doc(this.firestore, `usuarios/${uid}`);
    
    return setDoc(referenciaAlDocumento, {
      fotoPerfil: fotoPerfil,
      nombreCompleto: nombre,
      email: email,
      fechaRegistro: new Date()
    });
  }

  async loginUser(email: string, password: string) {
    const authInstancia = getAuth();
    return signInWithEmailAndPassword(authInstancia, email, password);
  }


  get currentUserId(): string | null {
    return this.auth.currentUser?.uid || null;
  }
  
  async completarPerfil(uid: string, { direccion, telefono, comuna, bio }: any) {
    const db = getFirestore();
    const nuevosDatos = { direccion, telefono, comuna, bio };
    const referencia = doc(db, `usuarios/${uid}`);
    
    // Referencia al documento que ya existe
    return await updateDoc(referencia, nuevosDatos);
    
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error("Error al cerrar sesión", error);
      throw error;
    }
  }
  
}

