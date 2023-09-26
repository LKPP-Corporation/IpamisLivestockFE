import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivestockstatusRoutingModule } from './livestockstatus-routing.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FormComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    LivestockstatusRoutingModule, SharedModule
  ]
})
export class LivestockstatusModule { }
