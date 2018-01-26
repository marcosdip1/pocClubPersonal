import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabHomePage} from "../tab-home/tab-home";
import {TabCatalogoPage} from "../tab-catalogo/tab-catalogo";
import {TabMiperfilPage} from "../tab-miperfil/tab-miperfil";
import { GlobalProvider } from "../../providers/global/global";

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
  private level: string;
  private flag: boolean;
  constructor(navParams: NavParams,private globals: GlobalProvider) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 1;
    this.level = globals.level;
    if (this.level === ''){
      this.flag = false;
    } else {
      this.flag = true;
    }
  }
}
