import {Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
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

declare var google;
/**
 * Generated class for the GeolocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html',
})
export class GeolocationPage {

  errorMessage:string;
  benefits:string[];
  map:any;
  options:GeolocationOptions;
  currentPos:Geoposition;
  locationBenefit:LatLng;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any;
  autocompleteItems: any;
  loading: any;
  markers: any;

  constructor(public navCtrl:NavController, public navParams:NavParams, public rest:RestProvider, private googleMaps:GoogleMaps, private geolocationNative:Geolocation, public zone: NgZone,public loadingCtrl: LoadingController) {
    this.locationBenefit = new LatLng(-35.2012189, -61.728174499999994);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;
    this.markers = [];
  }

  ionViewDidLoad() {
    this.getCatalog();
    this.getUserPosition();
  }

  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  selectSearchResult(item){
    this.clearMarkers();
    this.autocompleteItems = [];

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        let position = {
          lat: results[0].geometry.location.lat,
          lng: results[0].geometry.location.lng
        };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }

  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i]);
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  getCatalog() {
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
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    let mapEle:HTMLElement = document.getElementById('map');
    mapEle.classList.add('show-map');

    this.map = new google.maps.Map(mapEle, mapOptions);
    this.addMUserLocation();
    this.addMarker();
  }

  addMUserLocation() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: {
        lat: this.currentPos.coords.latitude,
        lng: this.currentPos.coords.longitude
      }
    });
    let content = '';
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
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

  getUserPosition() {
    this.options = {
      enableHighAccuracy: false
    };
    this.geolocationNative.getCurrentPosition(this.options).then((pos:Geoposition) => {

      this.currentPos = pos;

      console.log("POSITION");
      console.log(pos);
      this.addMap(pos.coords.latitude, pos.coords.longitude);

    }, (err:PositionError)=> {
      console.log("error : " + err.message);

    })
  }

}
