import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import {LoginPage} from "../login/login";
import { App  } from 'ionic-angular';

/**
 * Generated class for the TabMiperfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-miperfil',
  templateUrl: 'tab-miperfil.html',
})
export class TabMiperfilPage {
  private level: string;
  private levelId: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private globals: GlobalProvider,public app: App ) {
    this.level = globals.level;
    this.levelId = globals.levelId;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabMiperfilPage');
  }

  doCerrarSession() {
    this.globals.level = "";
    this.globals.levelId = "";
    this.app.getRootNav().setRoot( LoginPage );
   }
}
