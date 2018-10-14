import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './page/account.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MaterialModule} from '../../shared/material/material.module';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import {WidgetsModule} from '../../shared/widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialModule,
    WidgetsModule
  ],
  declarations: [AccountComponent, ToolbarComponent, AccountInfoComponent]
})
export class AccountModule { }
