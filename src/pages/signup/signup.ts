import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";

import {LoginPage} from "../login/login";

import {FormGroup} from "@angular/forms";
import {FormControl, Validators} from "@angular/forms";

import {UserProvider} from "../../providers/user/user";
import {ProfilePage} from "../profile/profile";
import {ProfilePicPage} from "../profile-pic/profile-pic";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newUser = {
    email: '',
    password:'',
    displayName:''
  }


  signup = new FormGroup({

    email: new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]
    ),

    password: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(5)    ,
        Validators.maxLength(20)


      ]
    )
  });

  constructor(public navCtrl: NavController,
              public userService: UserProvider,
              private toast:ToastController,
              public loadingCtrl:LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signUp(){
   /* let loader = this.loadingCtrl.create({
      content: "Please wait"
    });*/
    //loader.present();
    this.userService.addUser(this.newUser).then((res:any)=>{
     // loader.dismiss();
      if(res.success){
        this.navCtrl.push(ProfilePicPage);
      }
      else {

        this.toast.create({
          message:"User already in use",
          duration: 3000
        }).present();
      }
    })
  }

  logIn(){
    this.navCtrl.setRoot(LoginPage);
  }












  /*
 logIn(){
   this.navCtrl.push(LoginPage);
 }


 async signUp(u: Usercreds){
   try {
     this.afAuth.auth.createUserWithEmailAndPassword(u.email,u.password);
     this.signedUp = true;
     this.nextBtn = false;

   }

   catch (e){
     console.error(e);
   }
 }


 /*async next(user:User){
   try {
     const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
     if (result) {
       this.navCtrl.setRoot(ProfilePage);
     }
   }
   catch (e) {
     // console.error(e);
     // console.log('wrong');
     this.toast.create({
       message: 'Please sign up first',
       duration: 3000
     }).present();

   }

 }*/
}
