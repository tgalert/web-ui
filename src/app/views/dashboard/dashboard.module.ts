import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from './page/dashboard.component';
import {MaterialModule} from '../../shared/material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ToolbarMenuComponent } from './components/toolbar/toolbar-menu/toolbar-menu.component';
import {WidgetsModule} from '../../shared/widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    WidgetsModule
  ],
  declarations: [
    DashboardComponent,
    ToolbarComponent,
    ToolbarMenuComponent
  ]
})
export class DashboardModule { }
