import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {NoAuthGuard} from './core/guards/no-auth.guard';

const routes: Routes = [
  {path: '', loadChildren: './views/welcome/welcome.module#WelcomeModule', canActivate: [NoAuthGuard]},
  {path: 'dashboard', loadChildren: './views/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
  {path: 'account', loadChildren: './views/account/account.module#AccountModule', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
