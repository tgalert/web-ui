import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../core/services/auth.service';
import {ErrorService} from '../../../../core/services/error.service';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DeleteAccountDialogComponent} from '../delete-account-dialog/delete-account-dialog.component';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {

  loading = false;

  constructor(private dialog: MatDialog, private errorService: ErrorService,
              private authService: AuthService, private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onClickDeleteAccount() {
    // Open confirmation dialog
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent);

    // Handle user action on dialog (cancel or confirm)
    dialogRef.afterClosed().subscribe({
      next: confirmed => {
        if (confirmed) this.deleteAccount();
        else console.log('User cancelled dialog');
      },
      error: err => this.errorService.handleError(err)
    });
  }

  deleteAccount() {
    this.loading = true;
    this.authService.deleteUser().subscribe({
      next: () => {
        // No need to disable loading spinner, because we navigate away
        console.log('User deletion successful');
        this.snackBar.open('Your account has been successfully deleted.');
        this.router.navigate(['/']);
      },
      error: err => {
        this.loading = false;
        this.errorService.handleError(err);
      }
    });
  }

}
