import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {RestProvider} from '../providers/rest/rest';
import {HttpClientModule} from "@angular/common/http";
import {LoginPage} from "../pages/login/login";
import {TabHomePage} from "../pages/tab-home/tab-home";
import {TabCatalogoPage} from "../pages/tab-catalogo/tab-catalogo";
import {TabMiperfilPage} from "../pages/tab-miperfil/tab-miperfil";
import {GoogleMaps} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import {StoresPage} from "../pages/stores/stores";
import {GeolocationPage} from "../pages/geolocation/geolocation";
import { GlobalProvider } from '../providers/global/global';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    TabHomePage,
    TabCatalogoPage,
    TabMiperfilPage,
    StoresPage,
    GeolocationPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{tabsHideOnSubPages: true}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    TabHomePage,
    TabCatalogoPage,
    TabMiperfilPage,
    StoresPage,
    GeolocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    GoogleMaps,
    Geolocation,
    GlobalProvider
  ]
})
export class AppModule {
}
