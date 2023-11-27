import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhysicalReportRoutingModule } from './physical-report-routing.module';
import { LivestockInformationComponent } from './livestock-information/livestock-information.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    LivestockInformationComponent
  ],
  imports: [
    CommonModule,
    PhysicalReportRoutingModule, SharedModule
  ]
})
export class PhysicalReportModule { }
