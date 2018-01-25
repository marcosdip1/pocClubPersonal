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
  benefits:string[];
  map:any;
  options:GeolocationOptions;
  currentPos:Geoposition;
  locationBenefit:LatLng;

  constructor(public navCtrl:NavController, public navParams:NavParams, public rest:RestProvider, private googleMaps:GoogleMaps, private geolocationNative:Geolocation) {
    this.locationBenefit = new LatLng(-35.2012189, -61.728174499999994);
  }

  ionViewDidLoad() {
    this.getStores();
    this.loadMap();
  }

  getStores() {
    this.rest.getCatalogLocal()
      .subscribe(
        benefits => this.benefits = benefits,
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
    this.addMarker();
  }

  addMarker() {
    var position = new google.maps.LatLng(this.locationBenefit.lat, this.locationBenefit.lng);
    var dogwalkMarker = new google.maps.Marker({
      position: position,
      title: "benefit title",
      icon: 'assets/imgs/pin_icon_new.png'
    });
    dogwalkMarker.setMap(this.map);
    this.addInfoWindowToMarker(dogwalkMarker);
  }

  addInfoWindowToMarker(marker) {
    var infoWindowContent = '<div id="content"><p id="firstHeading" class="firstHeading">' + marker.title + '</p><p>Dirección</p><p>Horario</p></div>';
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
