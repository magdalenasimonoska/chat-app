import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {connreq} from "../../models/interfaces/request";
import * as firebase from "firebase";
import {RequestsProvider} from "../../providers/requests/requests";

/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  newrequest = {} as connreq;
  temparr = [];
  filteredusers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userservice: UserProvider, public alertCtrl: AlertController,
              public requestservice: RequestsProvider) {
    this.userservice.getAllUsers().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
    })
  }

  ionViewDidLoad() {

    }
  currUser= firebase.auth().currentUser;

  searchuser(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender === this.newrequest.recipient){
      alert('That is you');

    }

    else {
      let successalert = this.alertCtrl.create({
        title: 'Request sent',
        subTitle: 'Your request was sent to ' + recipient.displayName,
        buttons: ['ok']
      });

      this.requestservice.sendrequest(this.newrequest).then((res: any) => {
        if (res.success) {
          successalert.present();
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
      }).catch((err) => {
        alert(err);
      })
    }
  }

  /*
  filteredusers=[];
  temparr=[];
  newrequest={} as connreq;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userservice: UserProvider,
              private alertCtrl: AlertController,
              private requestservice: RequestsProvider) {
      this.userservice.getAllUsers().then((res:any)=>{
      this.filteredusers=res;
      this.temparr=res;

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

  searchuser(searchbar){
    this.filteredusers=this.temparr;
    var q =searchbar.target.value;
    if(q.trim()==''){
      return;
    }

    this.filteredusers=this.filteredusers.filter((v)=>{
      if((v.displayName.toLowerCase().indexOf(q.toLowerCase())) > -1){
        return true;
     }
     return false;
    })
  }


  sendreq(recipient){
    this.newrequest.sender=firebase.auth().currentUser.uid;
    this.newrequest.recipient=recipient.uid;
    if(this.newrequest.sender != this.newrequest.recipient){
      var successalert= this.alertCtrl.create({
        title:'Request sent',
        subTitle:'Your request has been sent to ' + recipient.displayName,
        buttons:['Ok']
      });
      this.requestservice.sendrequest(this.newrequest).then((res:any)=>{
        if(res.success){
          successalert.present();
          let sentuser=this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser,1)
        }
      }).catch((err)=>{
        alert(err);

      })

    }
    else {
      this.alertCtrl.create({
        message:'That is you'
      }).present();

    }

  }
*/

}
