import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabCatalogoPage } from './tab-catalogo';

@NgModule({
  declarations: [
    TabCatalogoPage,
  ],
  imports: [
    IonicPageModule.forChild(TabCatalogoPage),
  ],
})
export class TabCatalogoPageModule {}
