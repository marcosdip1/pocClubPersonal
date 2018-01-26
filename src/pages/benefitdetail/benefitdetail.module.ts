import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BenefitDetailPage } from './benefitdetail';
import {Injectable} from "@angular/core";

@NgModule({
  declarations: [
    BenefitDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BenefitDetailPage),
  ],
})

@Injectable()
export class BenefitDetailPageModule {
  image:string;
  name:string;
  shortDescription:string;
  startDate:string;
  endDate:string;
  level:string;
  description:string;
  provider:string;
  branchOffices:string;
  legal:string;
}
