import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Usercreds} from "../../models/interfaces/usercreds";

import {AuthProvider} from "../../providers/auth/auth";
import {TabsPage} from "../tabs/tabs";

import {ToastController} from "ionic-angular";
import {SignupPage} from "../signup/signup";
import {PasswordResetPage} from "../password-reset/password-reset";
import {Storage} from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {} as Usercreds;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthProvider,
              public toast:ToastController,
              private store: Storage
            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn(){
    this.authService.signIn(this.credentials).then((res:any)=>{
      if(!res.code){
        this.navCtrl.setRoot(TabsPage);
        this.store.set('loggedIn', 'true');

      }
      else{
        this.toast.create({
          message: "Please enter valid email and password",
          duration: 3000
        }).present();

      }
    }).catch((err)=>{
      this.toast.create({
        message: "Please enter valid email and password",
        duration: 3000
      }).present();
    })


  }

  signUp(){
    this.navCtrl.push(SignupPage);

  }

  passwordReset(){
    this.navCtrl.push(PasswordResetPage);
  }
}
