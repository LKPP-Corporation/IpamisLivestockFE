import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
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
    MenuRoutingModule, SharedModule
  ]
})
export class MenuModule { }
