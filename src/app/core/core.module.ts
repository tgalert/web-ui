import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmplifyService } from 'aws-amplify-angular';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AmplifyService
  ]
})
export class CoreModule { }
