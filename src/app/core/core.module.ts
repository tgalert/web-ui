import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmplifyService } from 'aws-amplify-angular';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {NoAuthGuard} from './guards/no-auth.guard';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    // Library services
    AmplifyService,

    // Own services
    AuthService,

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
