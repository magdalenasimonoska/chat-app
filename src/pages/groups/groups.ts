import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';
import {GroupchatPage} from "../groupchat/groupchat";
import {NewgroupPage} from "../newgroup/newgroup";
import {LoginPage} from "../login/login";
import * as firebase from "firebase";
import {Storage} from "@ionic/storage";
/**
 * Generated class for the GroupsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  allmygroups;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
              public loadingCtrl: LoadingController,
              public groupservice: GroupsProvider,
              private store: Storage) {
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Getting your groups, Please wait...'
    });
    loader.present();
    this.groupservice.getmygroups();
    loader.dismiss();
    this.events.subscribe('newgroup', () => {
      this.allmygroups = this.groupservice.mygroups;
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('newgroup');
  }

  addgroup() {
    this.navCtrl.push(NewgroupPage);
  }

  openchat(group) {
    this.groupservice.getintogroup(group.groupName);
    this.navCtrl.parent.parent.push(GroupchatPage, { groupName: group.groupName });

  }


  logOut(){
    firebase.auth().signOut().then(()=>{
      console.log('Logged out');
      this.navCtrl.parent.parent.setRoot(LoginPage);
      this.store.remove('loggedIn');
    })

  }

}
