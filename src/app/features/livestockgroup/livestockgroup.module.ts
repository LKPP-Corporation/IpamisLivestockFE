import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivestockgroupRoutingModule } from './livestockgroup-routing.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    LivestockgroupRoutingModule, SharedModule
  ]
})
export class LivestockgroupModule { }
