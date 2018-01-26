import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import {StoresPage} from "../stores/stores";
import {GeolocationPage} from "../geolocation/geolocation";
import {BenefitDetailPage} from "../benefitdetail/benefitdetail";
import {HttpClient} from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";

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
  private level: string;
  private levelId: string;

  constructor(public navCtrl:NavController, public navParams:NavParams, public rest:RestProvider, public http:HttpClient,private globals: GlobalProvider) {
    this.level = globals.level;
    this.levelId = globals.levelId;
  }

  ionViewDidLoad() {
     this.getCatalog();
  }

/*  ionViewWillEnter() {
    this.getCatalog();
  }*/

  getCatalog() {
    this.rest.getCatalogProd(this.levelId)
      .subscribe(
        (benefits:any) => this.benefits = benefits.descuentos,
        error => this.errorMessage = <any>error);
        console.log(this.benefits);
  }

  openGeolocation() {
    this.navCtrl.push(GeolocationPage);
  }

  openStores() {
    this.navCtrl.push(StoresPage);
  }

  openDetail(idBenefit, nameBenefit){
    this.navCtrl.push(BenefitDetailPage,{
      idBenefitParam:idBenefit
    });
  }


}
