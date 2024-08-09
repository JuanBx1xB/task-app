import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, updateProfile } from "firebase/auth";
import { user } from '../models/user.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private utilsSvc: UtilsService

  ) { }

  //========Autenticación=======//

  login(user: user){
    return this.auth.signInWithEmailAndPassword(user.email, user.password)
  }


  signUp(user: user){
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
  }

  updateUser(user: any){
    const auth = getAuth();
    return updateProfile(auth.currentUser, user)
  }

  getAuthState(){
    return this.auth.authState
  }

  async signOut(){
    await this.auth.signOut();
    this.utilsSvc.routerLink('/auth');
    localStorage.removeItem('user');
  }


  //======Fire Store Base de Datos=====//

  
  getSubcollection(path: string, SubcollectionName: string){
    return this.db.doc(path).collection(SubcollectionName).valueChanges({idFied: 'id'})
  }
  // Método para agregar un documento a una subcolección
  addToSubcollection(path: string, subcollectionName: string, object: any) {
    return this.db.doc(path).collection(subcollectionName).add(object);
  }
  updateDocument(path: string, object: any){
    return this.db.doc(path).update(object);
  }
  deleteDocument(path: string) {
    return this.db.doc(path).delete();
  }
}
  
  


