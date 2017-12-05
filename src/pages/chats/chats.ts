import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { ChatProvider } from '../../providers/chat/chat';
import * as firebase from "firebase";
import {LoginPage} from "../login/login";
import {FriendchatPage} from "../friendchat/friendchat";
import {FriendsPage} from "../friends/friends";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ChatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  myrequests;
  myfriends;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public requestservice: RequestsProvider,
              public events: Events,
              public alertCtrl: AlertController,
              public chatservice: ChatProvider,
              private store:Storage) {
  }


  ionViewWillEnter() {
    this.requestservice.getmyrequests();
    this.requestservice.getmyfriends();
    this.myfriends = [];
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    })
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friends');
  }


  addFriend() {
    this.navCtrl.push(FriendsPage);
  }

  accept(item) {
    this.requestservice.acceptrequest(item).then(() => {

      let newalert = this.alertCtrl.create({
        title: 'Friend added',
        subTitle: 'Tap on your friend to chat',
        buttons: ['Okay']
      });
      newalert.present();
    })
  }

  ignore(item) {
    this.requestservice.deleterequest(item).then(() => {

    }).catch((err) => {
      alert(err);
    })
  }

  friendchat(friend) {
    this.chatservice.initializebuddy(friend);
    this.navCtrl.push(FriendchatPage);
  }

  logOut(){
    firebase.auth().signOut().then(()=>{
      console.log('Logged out');
      this.navCtrl.parent.parent.setRoot(LoginPage);
      this.store.remove('loggedIn');
    })




  }

}
