import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivestockInformationComponent } from './livestock-information/livestock-information.component';
import { MortalityRecordComponent } from './mortality-record/mortality-record.component';

const routes: Routes = [
  { path: '', redirectTo: 'livestock-information', pathMatch: 'full' },
  { path: 'livestock-information', component: LivestockInformationComponent},
  { path: 'mortality-record', component: MortalityRecordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicalReportRoutingModule { }
