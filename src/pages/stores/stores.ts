import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng
} from '@ionic-native/google-maps';
import {Geolocation, GeolocationOptions, Geoposition, PositionError} from '@ionic-native/geolocation';
import {RestProvider} from "../../providers/rest/rest";

declare var google;
/**
 * Generated class for the StoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {

  errorMessage:string;
  stores:any;
  map:any;
  options:GeolocationOptions;
  currentPos:Geoposition;
  locationBenefit:LatLng;
  idProviderParam:any;
  locationStore:LatLng;
  provider:any;
  nameBenefit:any;
  
  constructor(public navCtrl:NavController, public navParams:NavParams, public rest:RestProvider, private googleMaps:GoogleMaps, private geolocationNative:Geolocation) {
    this.idProviderParam = navParams.get("idBranchOfficesParam");
    this.nameBenefit = navParams.get("nameBenefitParam");
  }

  ionViewDidLoad() {
    this.getStores();
  }

  getStores() {
    this.rest.getStores(this.idProviderParam)
      .subscribe(
        (data:any) => {this.stores = data.sucursales, this.provider = data, this.loadMap()},
        error => this.errorMessage = <any>error);
    console.log(this.errorMessage);
  }

  addMap(lat, long) {

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
      center: latLng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    let mapEle:HTMLElement = document.getElementById('map');
    mapEle.classList.add('show-map');

    this.map = new google.maps.Map(mapEle, mapOptions);

    for (let s of this.stores) {
        this.locationStore = new LatLng(Number(s.latitud),Number(s.longitud));
        this.addMarker(this.locationStore, s.calle, s.numero, this.nameBenefit, this.provider.horarioAtencion);
    }
  }

  addMarker(latlong, calle, numero, nombre, horario) {
    var position = new google.maps.LatLng(latlong.lat, latlong.lng);
    var dogwalkMarker = new google.maps.Marker({
      position: position,
      title: nombre,
      icon: 'assets/imgs/pin_icon_new.png'
    });
    dogwalkMarker.setMap(this.map);
    this.addInfoWindowToMarker(dogwalkMarker, calle, numero, horario);
  }

  addInfoWindowToMarker(marker, calle, numero, horario) {
    var infoWindowContent = '<div id="content"><p id="firstHeading" class="firstHeading" no-margin>' + marker.title + '</p><p no-margin>'+calle+' '+numero+'</p><p no-margin>'+horario+'</p></div>';
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  loadMap() {
    this.options = {
      enableHighAccuracy: false
    };
    this.geolocationNative.getCurrentPosition(this.options).then((pos:Geoposition) => {
      this.currentPos = pos;
      this.addMap(pos.coords.latitude, pos.coords.longitude);
    }, (err:PositionError)=> {
      console.log("error : " + err.message);

    })
  }
}
