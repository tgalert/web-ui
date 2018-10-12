import { NgModule } from '@angular/core';
import {MaterialModule} from '../material/material.module';
import { FullscreenSpinnerComponent } from './fullscreen-spinner/fullscreen-spinner.component';

@NgModule({
  imports: [
    MaterialModule
  ],
  declarations: [
    FullscreenSpinnerComponent
  ],
  exports: [
    FullscreenSpinnerComponent
  ]
})
export class WidgetsModule { }
