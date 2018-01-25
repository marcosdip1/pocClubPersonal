import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabHomePage} from "../tab-home/tab-home";
import {TabCatalogoPage} from "../tab-catalogo/tab-catalogo";
import {TabMiperfilPage} from "../tab-miperfil/tab-miperfil";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any = TabMiperfilPage;
  tab2Root: any = TabHomePage;
  tab3Root: any = TabCatalogoPage;
  myIndex: number;

  constructor(navParams: NavParams) {
    // Set the active tab based on the passed index from menu.ts
     this.myIndex = navParams.data.tabIndex || 1;
  }
}
