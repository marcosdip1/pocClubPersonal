import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { GlobalProvider } from "../../providers/global/global";
/**
 * Generated class for the TabHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-home',
  templateUrl: 'tab-home.html',
})
export class TabHomePage {
  private homeCards;
  private level: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,private globals: GlobalProvider) {
    this.homeCards = restProvider.getHomeCards();
    this.level = globals.level;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabHomePage');
  }

  openLink(url) {
    var childWindow = window.open(url);
    childWindow.location.reload();
  }

}
