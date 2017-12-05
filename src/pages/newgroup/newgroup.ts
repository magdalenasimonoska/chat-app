import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';

/**
 * Generated class for the NewgroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-newgroup',
  templateUrl: 'newgroup.html',
})
export class NewgroupPage {
  newgroup = {
    groupName: 'GroupName',
    groupPic: 'https://firebasestorage.googleapis.com/v0/b/chatapp-f1c9e.appspot.com/o/group-placeholder.jpg?alt=media&token=1615ff5c-a629-44c6-a2ba-5c10360f80fa'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public groupservice: GroupsProvider, public imghandler: ImghandlerProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewgroupPage');
  }

  chooseimage() {
    if (this.newgroup.groupName == 'GroupName') {
      let namealert = this.alertCtrl.create({
        buttons: ['okay'],
        message: 'Enter the groupname first. '
      });
      namealert.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Loading, please wait..'
      });
      loader.present();
      this.imghandler.grouppicstore(this.newgroup.groupName).then((res: any) => {
        loader.dismiss();
        if(res)
          this.newgroup.groupPic = res;
      }).catch((err) => {
        alert(err);
      })
    }

  }

  creategroup() {
    this.groupservice.addgroup(this.newgroup).then(() => {
      this.navCtrl.pop();
    }).catch((err) => {
      alert(JSON.stringify(err));
    })
  }

  editgroupname() {
    let alert = this.alertCtrl.create({
      title: 'Edit Group Name',
      inputs: [{
        name: 'groupname',
        placeholder: 'Give a new groupname'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {

        }
      },
        {
          text: 'Set',
          handler: data => {
            if (data.groupname) {
              this.newgroup.groupName = data.groupname
            }

            else {
              this.newgroup.groupName = 'groupName';
            }
          }
        }
      ]
    });
    alert.present();
  }

  odiNazad(){
    this.navCtrl.pop();
  }
}
