import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SideMenuPage } from './sidemenu';

@NgModule({
  declarations: [
    SideMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(SideMenuPage),
  ],
})
export class SidemenuPageModule {}
