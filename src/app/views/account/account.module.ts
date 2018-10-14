import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './page/account.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MaterialModule} from '../../shared/material/material.module';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import {WidgetsModule} from '../../shared/widgets/widgets.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { DeleteAccountDialogComponent } from './components/delete-account-dialog/delete-account-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    WidgetsModule
  ],
  declarations: [
    AccountComponent,
    ToolbarComponent,
    AccountInfoComponent,
    ChangePasswordComponent,
    DeleteAccountComponent,
    DeleteAccountDialogComponent
  ],
  entryComponents: [
    DeleteAccountDialogComponent
  ]
})
export class AccountModule { }
