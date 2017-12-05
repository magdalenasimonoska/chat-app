import { Component, NgZone } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ImghandlerProvider} from "../../providers/imghandler/imghandler";
import {UserProvider} from "../../providers/user/user";
import {TabsPage} from "../tabs/tabs";
import {storage} from 'firebase';

import * as firebase from "firebase";
import {Camera, CameraOptions} from "@ionic-native/camera";


@IonicPage()
@Component({
  selector: 'page-profile-pic',
  templateUrl: 'profile-pic.html',
})
export class ProfilePicPage {

  imgurl = 'https://firebasestorage.googleapis.com/v0/b/chatapp-f1c9e.appspot.com/o/person-placeholder.jpg?alt=media&token=1e4ccf66-6737-406f-9609-ebbc1de3fdd6';
  newImgUrl:string;
  moveon: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public imgservice: ImghandlerProvider,
              public zone: NgZone, public userservice: UserProvider, public loadingCtrl: LoadingController,
              private camera:Camera,
              private alertCtrl:AlertController
              ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfilepicPage');
  }

  chooseimage() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    /*this.imgservice.uploadimage().then((uploadedurl: any) => {
      loader.dismiss();
      this.zone.run(() => {
        this.imgurl = uploadedurl;
        this.moveon = false;
      })
    })*/
  }

  updateproceed() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.userservice.updateimage(this.imgurl).then((res: any) => {
      loader.dismiss();
      if (res.success) {
        this.navCtrl.setRoot('TabsPage');
      }
      else {
        alert(res);
      }
    })
  }

  proceed() {
    this.navCtrl.setRoot('TabsPage');
  }


  //CAPTURE
  captureDataUrl: string ='https://firebasestorage.googleapis.com/v0/b/chatapp-f1c9e.appspot.com/o/person-placeholder.jpg?alt=media&token=1e4ccf66-6737-406f-9609-ebbc1de3fdd6';
  capture(){

    const cameraOptions: CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(cameraOptions).then((imageData)=>{
      this.captureDataUrl ='data:image/jpeg;base64,' +imageData;
      this.newImgUrl = this.captureDataUrl;
      //this.imgurl=this.captureDataUrl;

    }), (err)=>{
      alert(err);
    }



  }


//SHOW SUCCESS ALERT CREATION
 showsuccess(){
   let alert= this.alertCtrl.create({
     title:'uploaded',
     subTitle:'pic is uploaded',
     buttons:['OK']
   });
   alert.present()
   this.captureDataUrl="";
 }


 //UPLOAD THE PICTURE
 uploadpic(){
   try{
     let storageref=firebase.storage().ref();
     const filename= Math.floor(Date.now()/1000);
     const imageRef = storageref.child(`images/${filename}.jpg`).child(firebase.auth().currentUser.photoURL);
     imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((img)=>{
       this.showsuccess();
      //firebase.database().ref('/profileimages').child(firebase.auth().currentUser.uid).push(img)
       this.userservice.updateimage(this.captureDataUrl);
       this.navCtrl.setRoot(TabsPage)
     }).catch((err)=>{
       alert(err);
     });

   }
   catch(err){
     alert(err);
   }
 }


/*imgurl = 'https://firebasestorage.googleapis.com/v0/b/chatapp-f1c9e.appspot.com/o/person-placeholder.jpg?alt=media&token=1e4ccf66-6737-406f-9609-ebbc1de3fdd6';
moveon=true;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public imghandler: ImghandlerProvider,
              public zone: NgZone,
              public userervice: UserProvider,
              public camera:Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePicPage');
  }

base64Image:any;


  pickImage() {
    this.takeThePhoto(this.camera.PictureSourceType.SAVEDPHOTOALBUM);
  }

  takeThePhoto(pictureSourceType) {
    this.camera.getPicture({
      sourceType: pictureSourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 50,
      targetWidth: 720,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG
    })
      .then(
        imageURI => {
          window['plugins'].crop.promise(imageURI, {
            quality: 75
          }).then(newPath => {
              return this.toBase64(newPath).then((base64Img) => {
                this.base64Image = base64Img;
              });
            },
            error => {
              console.log("CROP ERROR -> " + JSON.stringify(error));
              alert("CROP ERROR: " + JSON.stringify(error));
            }
          );
        },
        error => {
          console.log("CAMERA ERROR -> " + JSON.stringify(error));
          alert("CAMERA ERROR: " + JSON.stringify(error));
        }
      );
  }

  toBase64(url: string) {
    return new Promise<string>(function (resolve) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.send();
    });
  }

  resize(base64Img, width, height) {
    var img = new Image();
    img.src = base64Img;
    var canvas = document.createElement('canvas'),ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg");
  }



  updateproceed(){
    this.userervice.updateimage(this.imgurl).then((res:any)=>{
      if(res.success){
        this.navCtrl.setRoot(TabsPage);
      }
      else{
        alert(res);
      }
    })
  }

  proceed(){
    this.navCtrl.setRoot(TabsPage);
  }*/
  /*chooseImage(){
   this.imghandler.uploadimage().then((uploadurl:any)=>{
     this.zone.run(()=>{
       this.imgurl=uploadurl;
       this.moveon=false;
     })
   })

   }*/

  /*
  chooseImage(){
  this.imghandler.uploadimage().then(()=>{
    var promise = new Promise((resolve, reject) => {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true
      }).then((imagedata) => {
        firebase.storage().ref('/profileimages').child(firebase.auth().currentUser.uid)
          .putString(imagedata, 'base64', {contentType: 'image/png'})
          .then(savePic => {
            resolve(savePic.downloadURL);
          }).catch((err) => {
          reject(err);
        });
      });
    });
    return promise;
  })
  }
   */
 /* base64Image: any;

  constructor(public camera: Camera) {
  }

  accessGallery() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });

  }*/
}
