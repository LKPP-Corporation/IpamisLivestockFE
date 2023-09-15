import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivestockgroupRoutingModule } from './livestockgroup-routing.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    FormComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    LivestockgroupRoutingModule
  ]
})
export class LivestockgroupModule { }
