import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './page/welcome.component';
import {NoAuthGuard} from '../../core/guards/no-auth.guard';

const routes: Routes = [
  {path: '', component: WelcomeComponent, canActivate: [NoAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
