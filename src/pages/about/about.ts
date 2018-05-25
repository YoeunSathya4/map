import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private platform: Platform, private alertCtrl: AlertController) {
    platform.ready().then(() => {
      //this.presentPrompt();
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
            
           }
          }
        }
      ]
    });

    alert.present();
  }

}
