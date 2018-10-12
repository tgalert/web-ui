import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import {WelcomeComponent} from './page/welcome.component';
import {MaterialModule} from '../../shared/material/material.module';
import { AuthTabsComponent } from './components/auth-tabs/auth-tabs.component';
import { SignInComponent } from './components/auth-tabs/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth-tabs/sign-up/sign-up.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ForgotPasswordDialogComponent } from './components/auth-tabs/sign-in/forgot-password-dialog/forgot-password-dialog.component';

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
    SignInComponent,
    SignUpComponent,
    ForgotPasswordDialogComponent
  ],
  entryComponents: [
    ForgotPasswordDialogComponent
  ]
})
export class WelcomeModule { }
