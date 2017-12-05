import {AngularFireAuth} from "angularfire2/auth";
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {AlertController, ToastController} from "ionic-angular";
import {snapshotChanges} from "angularfire2/database";


@Injectable()
export class UserProvider {

  firedata= firebase.database().ref('/users/');

  constructor(public afAuth: AngularFireAuth,
              public toast: ToastController,
              public alertCtrl:AlertController) {
   // console.log('Hello UserProvider Provider');

  }

  addUser(newUser){
    var promise = new Promise((resolve,reject) =>{
      this.afAuth.auth.createUserWithEmailAndPassword(newUser.email,newUser.password).then(()=>{
        this.afAuth.auth.currentUser.updateProfile({
          displayName:newUser.displayName,
          photoURL:'https://firebasestorage.googleapis.com/v0/b/chatapp-f1c9e.appspot.com/o/person-placeholder.jpg?alt=media&token=1e4ccf66-6737-406f-9609-ebbc1de3fdd6'

        }).then(()=>{
          this.firedata.child(this.afAuth.auth.currentUser.uid).set({
            uid:this.afAuth.auth.currentUser.uid,
            displayName: newUser.displayName,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/chatapp-f1c9e.appspot.com/o/person-placeholder.jpg?alt=media&token=1e4ccf66-6737-406f-9609-ebbc1de3fdd6'
          }).then(()=>{
            resolve({success: true});
          }).catch((err)=>{
           // reject(err);
            this.toast.create({
              message:"User already in use",
              duration: 3000
            }).present();
          })
        }).catch((err)=>{
         // reject(err);
          this.toast.create({
            message:"User already in use",
            duration: 3000
          }).present();
        })
      }).catch((err)=>{
        //reject(err);
        this.toast.create({
          message:"User already in use",
          duration: 3000
        }).present();
      })
    });

    return promise;

  }
  passwordReset(email){
    let alert = this.alertCtrl.create({
      buttons:[
        'Ok'
      ]
    })
    var promise = new Promise ((resolve,reject)=>{
      firebase.auth().sendPasswordResetEmail(email).then(()=>{
        resolve({success:true});
        alert.setTitle('Email Sent');
        alert.present();
      }).catch((err)=>{
        //reject(err);
        alert.setTitle('Failed');
        alert.present();
      })
    })
    return promise;
  }

  updateimage(imageurl){
    var promise = new  Promise((resolve,reject)=>{
      this.afAuth.auth.currentUser.updateProfile({
        displayName: this.afAuth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then(()=>{
        firebase.database().ref('/users/'+firebase.auth().currentUser.uid).update({
          displayName:this.afAuth.auth.currentUser.displayName,
          photoURL:imageurl,
          uid:firebase.auth().currentUser.uid
        }).then(()=>{
          resolve({success:true});
        }).catch((err)=>{
          reject(err);
        })
      }).catch((err)=>{
        reject(err);
      })
    })
    return promise;
  }

  //ACCESING PARTICULAR USER
  getUserDetails(){
    var promise= new Promise((resolve,reject)=>{
      this.firedata.child(firebase.auth().currentUser.uid).once('value',(snapshot)=>{
        resolve(snapshot.val());
      }).catch((err)=>{
        reject(err);
      })
    })
    return promise;
  }

  updateDisplayName(newname){
    var promise=new Promise((resolve,reject)=>{
      this.afAuth.auth.currentUser.updateProfile({
        displayName:newname,
        photoURL:this.afAuth.auth.currentUser.photoURL
      }).then(()=>{
        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayName:newname,
          photoURL:this.afAuth.auth.currentUser.photoURL,
          uid:this.afAuth.auth.currentUser.uid
        }).then(()=>{
          resolve({success:true});
        }).catch((err)=>{
          reject(err);
        })
      }).catch((err)=>{
        reject(err);
      })
    })
    return promise;

  }

  //GET ALL THE USERS FROM THE USERS COLLECTION
  getAllUsers(){
    var promise = new Promise((resolve,reject)=>{
      this.firedata.orderByChild('uid').once('value',(snapshot)=>{
        let userdata=snapshot.val();
        let temparr=[];
        for(var key in userdata){
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err)=>{
        reject(err);
      })
    })
    return promise;
  }

}
