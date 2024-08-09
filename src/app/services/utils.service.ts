import { Injectable } from '@angular/core';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Router } from '@angular/router';
import { Item } from '../models/task.model';



export interface Task {
  // Propiedades de una tarea
  id: string;
  title: string;
  description: string;
  items: Item[]; // Suponiendo que items es un array de cualquier tipo.
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  //==========loading==========//
  //==Present
  async presentLoading(opts?: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }

//dismiss
  async dismissLoading(){
    return await this.loadingController.dismiss()
  }

//====localstorage
//SET
  setElementInLocalstorage(key: string, element: any){
    return localStorage.setItem(key, JSON.stringify(element))
  }
//GET
  getElementFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key));
  }
  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }


  //====Router===//
  routerLink(url: string){
  return this.router.navigateByUrl(url);
  }


  //=====Alert===//
  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);
  
    await alert.present();
  }



  //========Modal=======//

  //===PRESENT===//
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);
    await modal.present();

    const {data} = await modal.onWillDismiss();

    if(data){
      return data;
    }
  }
  //==DISMISS==//

  dismissModal(data?: any ){
    this.modalController.dismiss(data);
  }

  
  getPercentage(task: Task) {
    let completedItems = task.items.filter(item => item.completed).length;
    let totalItems = task.items.length;
    let percentage = (100 / totalItems) * completedItems;
  
    return parseInt(percentage.toString())
  }
  
}