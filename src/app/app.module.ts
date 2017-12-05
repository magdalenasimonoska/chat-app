import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { config} from './app.firebase.config';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireModule} from "angularfire2";
import { AuthProvider } from '../providers/auth/auth';
import {SignupPage} from "../pages/signup/signup";
import {GroupsPage} from "../pages/groups/groups";
import {ProfilePage} from "../pages/profile/profile";
import {ChatsPage} from "../pages/chats/chats";
import { UserProvider } from '../providers/user/user';
import {ProfilePicPage} from "../pages/profile-pic/profile-pic";
import {PasswordResetPage} from "../pages/password-reset/password-reset";
import { ImghandlerProvider } from '../providers/imghandler/imghandler';

import {FileChooser} from "@ionic-native/file-chooser";
import {FilePath} from "@ionic-native/file-path";
import {File} from "@ionic-native/file";
import { Camera } from '@ionic-native/camera'
import {FriendsPage} from "../pages/friends/friends";
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';
import { GroupsProvider } from '../providers/groups/groups';
import {FriendchatPage} from "../pages/friendchat/friendchat";
import {GroupchatPage} from "../pages/groupchat/groupchat";
import {GroupfriendsPage} from "../pages/groupfriends/groupfriends";
import {GroupinfoPage} from "../pages/groupinfo/groupinfo";
import {GroupmembersPage} from "../pages/groupmembers/groupmembers";
import {NewgroupPage} from "../pages/newgroup/newgroup";

import { IonicStorageModule } from '@ionic/storage';
import { AddPhotoProvider } from '../providers/add-photo/add-photo';



@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    SignupPage,
    GroupsPage,
    ProfilePage,
    ChatsPage,
    ProfilePicPage,
    PasswordResetPage,
    FriendsPage,
    FriendchatPage,
    GroupchatPage,
    GroupfriendsPage,
    GroupinfoPage,
    GroupmembersPage,
    GroupsPage,
    NewgroupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement :'top'}),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    SignupPage,
    GroupsPage,
    ProfilePage,
    ChatsPage,
    ProfilePicPage,
    PasswordResetPage,
    FriendsPage,
    FriendchatPage,
    GroupchatPage,
    GroupfriendsPage,
    GroupinfoPage,
    GroupmembersPage,
    GroupsPage,
    NewgroupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserProvider,
    ImghandlerProvider,
    File,
    FileChooser,
    FilePath,
    Camera,
    RequestsProvider,
    ChatProvider,
    GroupsProvider,
    AddPhotoProvider,

  ]
})
export class AppModule {}
