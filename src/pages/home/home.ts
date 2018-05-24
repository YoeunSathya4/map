import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface User {
  id: number;
  name: string;
  phone: string; 
  lat:string;
  lon:string; 
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userCol: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  public username:string = '';

  constructor(public navCtrl: NavController, private platform: Platform, public afs:AngularFirestore, private geolocation: Geolocation, private alertCtrl: AlertController) {

    platform.ready().then(() => {
      
      this.username = localStorage.getItem('username');
      if(this.username != null){
        this.watchGeo(this.username);
      }else{
        this.presentPrompt(); 
      }

     
     

     
      //Getting the users
      this.userCol = this.afs.collection('users');
      this.users = this.userCol.valueChanges();
      

    });



   
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'User',
      inputs: [
        {
          name: 'username',
          placeholder: 'Enter username here!'
        }
      ],
      buttons: [
    
        {
          text: 'Set',
          handler: data => {
           if(data.username != ''){
            localStorage.setItem('username', data.username); 
            this.watchGeo(data.username);
           }
          }
        }
      ]
    });

    alert.present();
  }

  watchGeo(username:string = ''){
    const watch = this.geolocation.watchPosition().subscribe(pos => {
      var data = {
        lat: pos.coords.latitude, 
        lon: pos.coords.longitude
      }

      this.afs.collection('users').doc(username).update(data); 

  });
  }





}
