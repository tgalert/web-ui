import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import {WelcomeComponent} from './page/welcome.component';
import {MaterialModule} from '../../shared/material/material.module';
import { AuthTabsComponent } from './components/auth-tabs/auth-tabs.component';
import { AuthSignInComponent } from './components/auth-sign-in/auth-sign-in.component';
import { AuthSignUpComponent } from './components/auth-sign-up/auth-sign-up.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    WelcomeComponent,
    AuthTabsComponent,
    AuthSignInComponent,
    AuthSignUpComponent
  ]
})
export class WelcomeModule { }
