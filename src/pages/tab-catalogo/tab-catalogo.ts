import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';

/**
 * Generated class for the TabCatalogoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-catalogo',
  templateUrl: 'tab-catalogo.html',
})
export class TabCatalogoPage {

  countries:string[];
  errorMessage:string;
  benefits:string[];


  constructor(public navCtrl:NavController, public navParams:NavParams, public rest:RestProvider) {
  }

  ionViewDidLoad() {
    this.getCatalogTest();
  }

  getCountries() {
    this.rest.getCountries()
      .subscribe(
        countries => this.countries = countries,
        error => this.errorMessage = <any>error);
  }

  getCatalogTest() {
    this.rest.getCatalogTest()
      .subscribe(
        benefits => this.benefits = benefits,
        error => this.errorMessage = <any>error);
  }

  openGeolocation(){
    this.navCtrl.push('GeolocationPage');
  }

}
