import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmpassword: new FormControl(''),
  })

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
    this.ConfirmPassWordValidator()
  }

  ConfirmPassWordValidator(){
    this.form.controls.confirmpassword.setValidators([
      Validators.required,
      CustomValidators.matchValues(this.form.controls.password)
    ])

    this.form.controls.confirmpassword.updateValueAndValidity();
  }

  submit(){
    
    if(this.form.valid){

     
      this.utilsSvc.presentLoading({ message: 'Registrando...'})
      this.firebaseSvc.signUp(this.form.value as user ).then(async res =>{
        console.log(res);
        await this.firebaseSvc.updateUser({ displayName: this.form.value.name })
        let user: user = {
          uid:res.user.uid,
          name: res.user.displayName,
          email: res.user.email
        }

        this.utilsSvc.setElementInLocalstorage('user', user);
        this.utilsSvc.routerLink('/tabs/home')

        this.utilsSvc.dismissLoading();

        this.utilsSvc.presentToast({
          message:`Te damos la bienvenida ${user.name}`,
          duration: 1500,
          color: 'primary',
          icon: 'person-outline'
        })

        this.form.reset();

      }, error =>{

        this.utilsSvc.dismissLoading();
        this.utilsSvc.presentToast({
          message:error,
          duration: 5000,
          color: 'warning',
          icon: 'alert-circle-outline'
        })
      })
    }
  }
}