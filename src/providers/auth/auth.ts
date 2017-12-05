import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {Usercreds} from "../../models/interfaces/usercreds";
import {resolveDefinition} from "@angular/core/src/view/util";

@Injectable()
export class AuthProvider {

  constructor(public afAuth:AngularFireAuth) {

  }

  signIn(credentials:Usercreds){
    var promise = new Promise((resolve,reject) =>{
      this.afAuth.auth.signInWithEmailAndPassword(credentials.email,credentials.password).then(()=>{
        resolve(true);
      }).catch((err)=>{
        resolve(err);
      })
    });

    return promise;

  }

}
