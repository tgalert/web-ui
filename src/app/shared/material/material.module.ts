import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatMenuModule,
  MatSnackBarModule,
  MatTabsModule, MatToolbarModule
} from '@angular/material';

@NgModule({
  exports: [
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
