import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user= {} as user

  constructor(
    private firebasSvc: FirebaseService,
    private utilSvc: UtilsService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getUser()
  }

  

  getUser(){
    return this.user = this.utilSvc.getElementFromLocalStorage('user')
  }


  sigOut() {
    this.utilSvc.presentAlert({
      header: 'Cerrar Sesion',
      message: '¿Quieres Cerrar Sesión?',
      mode:'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          
        }, {
          text: 'Si, Cerrar',
          handler: () => {
            this.firebasSvc.signOut();
          }
        }
      ]
    })
  }

}
