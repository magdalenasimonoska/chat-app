import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';
import {LoginPage} from "../login/login";
import {FriendsPage} from "../friends/friends";
import {Camera,CameraOptions} from "@ionic-native/camera";
import {storage} from 'firebase';
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  avatar: string;
  displayName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userservice: UserProvider, public zone: NgZone, public alertCtrl: AlertController,
              public imghandler: ImghandlerProvider,
              private camera: Camera,
              private store:Storage) {
  }

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.userservice.getUserDetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
    })
  }

 editImage() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    this.imghandler.uploadImage().then((url: any) => {
      this.userservice.updateimage(url).then((res: any) => {
        if (res.success) {
          statusalert.setTitle('Updated');
          statusalert.setSubTitle('Your profile pic has been changed!');
          statusalert.present();
          this.zone.run(() => {
            this.avatar = url;
          })
        }
      }).catch((err) => {
        statusalert.setTitle('Failed');
        statusalert.setSubTitle('Your profile pic was not changed');
        statusalert.present();
      })
    })
  }

/* async editImage(){
   try{
     const options: CameraOptions={
       quality:50,
       targetHeight:600,
       targetWidth:600,
      sourceType:this.camera.PictureSourceType.CAMERA , //za galery PHOTOLIBRARY
       destinationType:this.camera.DestinationType.DATA_URL,
       encodingType: this.camera.EncodingType.JPEG,
       mediaType:this.camera.MediaType.PICTURE,
       correctOrientation: true
     }
     const result  = await this.camera.getPicture(options);
     const image = `data:image/jpeg;base64, ${result}`;
     const pictures = storage().ref('pictures');
     pictures.putString(image, 'data_url');
   }
   catch (e){
     console.error(e);
   }
 }*/

  editName() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    let alert = this.alertCtrl.create({
      title: 'Edit Name',
      inputs: [{
        name: 'nickname',
        placeholder: 'Name'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {

        }
      },
        {
          text: 'Save',
          handler: data => {
            if (data.nickname) {
              this.userservice.updateDisplayName(data.nickname).then((res: any) => {
                if (res.success) {
                  statusalert.setTitle('Updated');
                  statusalert.setSubTitle('Your name has been changed !');
                  statusalert.present();
                  this.zone.run(() => {
                    this.displayName = data.nickname;
                  })
                }

                else {
                  statusalert.setTitle('Failed');
                  statusalert.setSubTitle('Your name was not changed');
                  statusalert.present();
                }

              })
            }
          }

        }]
    });
    alert.present();
  }


  logOut(){
    firebase.auth().signOut().then(()=>{
      console.log('Logged out');
      this.navCtrl.parent.parent.setRoot(LoginPage);
      this.store.remove('loggedIn');
    })

  }

  addFriend() {
    this.navCtrl.push(FriendsPage);
  }


}
