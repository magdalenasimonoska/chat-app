import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {UserProvider} from "../../providers/user/user";
import {AlertController} from "ionic-angular";

/**
 * Generated class for the PasswordResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {
  email:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService:UserProvider,
              public alertCtrl: AlertController,
              public toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordResetPage');
  }

  reset(){
    let alert = this.alertCtrl.create({
      buttons:[
        'Ok'
      ]
    })
  this.userService.passwordReset(this.email).then((res:any)=>{
      if(res.success){
        alert.setTitle('Email Sent');
        alert.setSubTitle('PLease follow the instructions in the email to reset your password');
      }
    }).catch((err)=>{
      alert.setTitle('Failed');
      alert.setSubTitle(err);
  })
  }

  goBack(){
    this.navCtrl.setRoot(LoginPage);
  }

}
