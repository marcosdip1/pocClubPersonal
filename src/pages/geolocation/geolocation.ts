import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';

/**
 * Generated class for the GeolocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html',
})
export class GeolocationPage {

  errorMessage:string;
  benefits:string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest:RestProvider) {
  }

  ionViewDidLoad() {
    this.getCatalogTest();
  }

  getCatalogTest() {
    this.rest.getCatalogTest()
      .subscribe(
        benefits => this.benefits = benefits,
        error => this.errorMessage = <any>error);
  }
}
