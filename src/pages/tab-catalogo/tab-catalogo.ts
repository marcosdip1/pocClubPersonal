import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import {StoresPage} from "../stores/stores";
import {GeolocationPage} from "../geolocation/geolocation";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the TabCatalogoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-catalogo',
  templateUrl: 'tab-catalogo.html',
})
export class TabCatalogoPage {

  errorMessage:string;
  benefits:string[];
  headings:string[];

  constructor(public navCtrl:NavController, public navParams:NavParams, public rest:RestProvider, public http:HttpClient) {
  }

  ionViewDidLoad() {
    this.getCatalog();
    // this.getHeadings();
  }

  getHeadings() {
    //noinspection TypeScriptUnresolvedVariable
    this.rest.getCatalogDummy()
      .subscribe(
        benefits => this.headings = benefits.categorias,
        error => this.errorMessage = <any>error);
    console.log(this.headings);
  }

  getCatalog() {
    //noinspection TypeScriptUnresolvedVariable
    this.rest.getCatalogDummy()
      .subscribe(
        benefits => this.benefits = benefits.descuentos,
        error => this.errorMessage = <any>error);
        console.log(this.benefits);
  }

  openGeolocation() {
    this.navCtrl.push(GeolocationPage);
  }

  openStores() {
    this.navCtrl.push(StoresPage);
  }


}

