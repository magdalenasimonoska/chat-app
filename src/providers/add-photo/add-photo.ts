import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'rxjs/add/operator/map';
import {Usercreds} from "../../models/interfaces/usercreds";

@Injectable()
export class AddPhotoProvider {
  user = {} as Usercreds;
  public photoRef:any;
  public currentUser;
  public fireRef:any;
  constructor() {
    console.log('Hello AddPhotoProvider Provider');
    this.currentUser = firebase.auth().currentUser.uid;
    this.fireRef = firebase.database().ref();
    this.photoRef=firebase.database().ref('/users/'+this.currentUser+'/photos')

  }


  /*updateProfilePicture(picture: any = null): any{
    return this.photoRef.child(this.currentUser.uid)
      .putString(picture, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.userProfile.child(this.currentUser.uid).update({

          profilepicture: savedPicture.downloadURL});
      })
  }*/


}
