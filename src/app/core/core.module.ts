import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmplifyService } from 'aws-amplify-angular';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {NoAuthGuard} from './guards/no-auth.guard';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import {ErrorService} from './services/error.service';
import {MaterialModule} from '../shared/material/material.module';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material';


// TODO: is it ok to leave ErrorDialogComponent in the core module or should it be put in another module?
@NgModule({
  imports: [
    MaterialModule
  ],
  declarations: [ErrorDialogComponent],
  entryComponents: [ErrorDialogComponent],
  providers: [
    // Library services
    AmplifyService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}},

    // Own services
    AuthService,
    ErrorService,

    // Guards
    AuthGuard,
    NoAuthGuard
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core)
      throw new Error('CoreModule must be imported only in the root module (AppModule)');
  }
}
