import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { GeolocationPage } from "../geolocation/geolocation";
import { GlobalProvider } from "../../providers/global/global";
import { LoginPage } from "../login/login";
import { App } from 'ionic-angular';
import { StoresPage } from "../stores/stores";

@IonicPage()
@Component({
  selector: 'page-benefitdetail',
  templateUrl: 'benefitdetail.html',
})

export class BenefitDetailPage {

  errorMessage: string;
  benefits: string[];
  levelBasicDescription: any;
  levelFullDescription: any;
  image: any;
  name: any;
  shortDescription: any;
  startDate: any;
  endDate: any;
  levelBasic = false;
  levelFull = false;
  levelAll = false;
  description: any;
  provider: any;
  branchOffices: any;
  legal: any;
  idBenefitParam: any;
  loggedId: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    private globals: GlobalProvider,
    private alertCtrl: AlertController,
    public app: App) {

    this.idBenefitParam = navParams.get("idBenefitParam");
    this.levelBasicDescription = ''
    this.levelFullDescription = ''
    this.image = '';
    this.name = '';
    this.shortDescription = '';
    this.startDate = '';
    this.endDate = '';
    this.levelBasic = false;
    this.levelFull = false;
    this.levelAll = false;
    this.description = '';
    this.provider = '';
    this.branchOffices = '';
    this.legal = '';
    this.loggedId = globals.levelId;
  }

  ionViewDidLoad() {
    this.rest.getBenefitDetail(this.idBenefitParam)
      .subscribe(
      (data: any) => {
        this.image = data.imagen;
        this.name = data.nombre;
        this.shortDescription = data.descripcionCorta;
        this.startDate = data.vigenciaDesde;
        this.endDate = data.vigenciaHasta;
        this.description = data.descripcion;
        this.provider = data.proveedor.razonSocial;
        this.branchOffices = data.proveedor.id;
        this.legal = data.legales;
        if (this.loggedId !== '') {
          if (data.nivel.id === 1 || data.nivel.id === 3) {
            this.levelBasic = true;
          }
          if (data.nivel.id === 2 || data.nivel.id === 3) {
            this.levelFull = true;
          }
        } else {
          this.levelBasic = true;
          this.levelFull = true;
        }
      });
  }

  openBranchOffices(id) {
    this.navCtrl.push(StoresPage, {
      idBranchOfficesParam: id,
      nameBenefitParam:this.name
    });
  }

  openModal() {
    if (this.loggedId !== '') {
      let alert = this.alertCtrl.create({
        title: this.name,
        subTitle: 'Código de Canje: xxxxxxx',
        buttons: ['Aceptar']
      });
      alert.present();
    } else {
      this.app.getRootNav().setRoot(LoginPage);
    }
  }

}
