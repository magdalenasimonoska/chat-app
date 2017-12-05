import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChatsPage} from "../chats/chats";
import {ProfilePage} from "../profile/profile";
import {GroupsPage} from "../groups/groups";


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1:any =ProfilePage;
  tab2:any = ChatsPage;
  tab3:any =GroupsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



}
