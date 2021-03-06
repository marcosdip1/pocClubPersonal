import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  countries: string[];
  errorMessage: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private globals: GlobalProvider) {
    //this.getCountries();
  }

  doFacebook() {
    this.globals.level = "FULL";
    this.globals.levelId = "2";
    this.navCtrl.setRoot('TabsPage');
  }

  doTwitter() {
    this.globals.level = "BASIC";
    this.globals.levelId = "1";
    this.navCtrl.setRoot('TabsPage');
  }
  doAnonimo() {
    this.globals.level = "";
    this.globals.levelId = "";
    this.navCtrl.setRoot('TabsPage');
  }

}
