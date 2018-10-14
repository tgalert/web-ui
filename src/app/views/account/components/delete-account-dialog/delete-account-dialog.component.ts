import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.scss']
})
export class DeleteAccountDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteAccountDialogComponent>) { }

  onClickDeleteAccount() {
    this.dialogRef.close(true);
  }

}
