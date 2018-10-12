import {NgModule, Optional, SkipSelf} from '@angular/core';
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
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core)
      throw new Error('CoreModule must be imported only in the root module (AppModule)');
  }
}
