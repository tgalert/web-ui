import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import {WelcomeComponent} from './page/welcome.component';
import {MaterialModule} from '../../shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MaterialModule
  ],
  declarations: [
    WelcomeComponent
  ]
})
export class WelcomeModule { }
