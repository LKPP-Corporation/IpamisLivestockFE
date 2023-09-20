import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivestockstatusRoutingModule } from './livestockstatus-routing.module';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    LivestockstatusRoutingModule
  ]
})
export class LivestockstatusModule { }
