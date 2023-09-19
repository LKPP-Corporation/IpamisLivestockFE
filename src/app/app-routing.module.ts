import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/authentication/authentication.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      { path: 'soil', loadChildren: () => import('./features/soil/soil.module').then(m => m.SoilModule) },
      { path: 'user', loadChildren: () => import('./config/user/user.module').then(m => m.UserModule) },
      { path: 'menu', loadChildren: () => import('./config/menu/menu.module').then(m => m.MenuModule) },
      { path: 'livestock', loadChildren: () => import('./features/livestock/livestock.module').then(m => m.LivestockModule) }
    ],
  },
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
