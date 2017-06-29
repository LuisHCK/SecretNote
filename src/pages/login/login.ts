import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PincodeController } from "ionic2-pincode-input/dist";

import CryptoJS from 'crypto-js';
import { Storage } from '@ionic/storage';

import { HomePage } from './../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  code: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public pincodeCtrl: PincodeController,
    private storage: Storage,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    // Try to get password stored
    this.storage.get('password_encrypt').then(pdw => {
      if (pdw) {
        console.log("Encrypted passwordk: " + pdw)
      }
      // Give a welcome to user and answer for new password
      else {
        this.presentAlertConfirm('Welcome!!!', "To start using this application you need to provide a 5 digit password")
      }
    })
  }

  // Open pincode pad
  openPinCode(fase): any {
    let pinCode = this.pincodeCtrl.create({
      title: 'Enter PIN',
      passSize: 5,
      hideForgotPassword: true
    });

    pinCode.present();

    pinCode.onDidDismiss((code, status) => {
      // If user enter a password and the fase if confirm
      // do a login
      if (status === 'done' && fase === 'confirm') {
        this.doLogin(code);
      }
      // Make a registration to user
      else if (status === 'done' && fase === 'register') {
        this.code = code;
        // Confirm if pincodes match
        this.confirmCode();
      }
      else if (status === 'forgot') {
        // forgot password
      }

    })
  }

  // Confirm code for registration
  confirmCode(): any {
    let pinCode = this.pincodeCtrl.create({
      title: 'Confirm your PIN',
      passSize: 5,
      hideForgotPassword: true
    });
    pinCode.present();
    pinCode.onDidDismiss((code, status) => {
      if (status === 'done') {
        if (this.code == code) {
          // if match send a message and do a registration of pin code
          this.presentAlert("Password setting completed!", "You can now access the application. Have fun!");
          this.doPincodeRegistration(code);
        }
        else {
          this.presentAlert("Error!", "PINs do not match. Try again");
          this.openPinCode('register');
        }
      }
    })
  }

  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ["It's Ok"]
    });
    alert.present();
  }

  presentAlertConfirm(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [{
        text: "It's Ok",
        handler: () => {
          this.openPinCode('register')
        }
      }]
    });
    alert.present();
  }

  // Store Encrypted pincode on local storage
  doPincodeRegistration(pincode) {
    let hash = String(CryptoJS.SHA256(pincode))
    this.storage.set('password_encrypt', hash);
    this.storage.set('notes',"")
  }

  // try to login and push to home page
  doLogin(pincode) {
    // store passwords 
    let entered_pincode = String(CryptoJS.SHA256(pincode))
    // get password stored on local storage
    this.storage.get('password_encrypt').then(pwd => {
      let stored_pincode = String(pwd)
      console.log("Stored password: " + stored_pincode)

      // if match go to home page
      if (entered_pincode == stored_pincode) {
        this.navCtrl.setRoot(HomePage, {
          pincode: entered_pincode
        });
      }
      else {
        this.presentAlert("Error", "Pincode doesn't match")
      }
    });
  }

}
