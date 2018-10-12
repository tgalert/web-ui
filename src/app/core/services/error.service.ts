import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ErrorDialogComponent} from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private dialog: MatDialog) { }

  /**
   * Handle an unexpected error. Log error and display a dialog to the user.
   *
   * @param err Any type of error object.
   */
  public handleError(err: Object) {

    console.error(err);

    this.dialog.open(ErrorDialogComponent, {
      data: {error: err},
      minWidth: '400px'
    });
  }
}
