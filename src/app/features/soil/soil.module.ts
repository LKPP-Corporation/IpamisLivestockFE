import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoilRoutingModule } from './soil-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    SoilRoutingModule, SharedModule
  ]
})
export class SoilModule { }
