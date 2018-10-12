import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../../../core/services/auth.service';
import {ErrorService} from '../../../../../../core/services/error.service';
import {passwordMatchValidator} from '../../../../../../_helpers/validators';
import {MIN_PW} from '../../../../../../_helpers/constants';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent implements OnInit {

  step1Form: FormGroup;
  step2Form: FormGroup;

  /* Triggers to show next form */
  currentStep = 1;

  /* Needed in order to programmatically set focus on an input field. See
   * https://github.com/angular/angular/issues/12463 */
  @ViewChild('emailElt') emailElt: ElementRef;
  @ViewChild('codeElt') codeElt: ElementRef;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private snackBar: MatSnackBar, private errorService: ErrorService,
              private dialogRef: MatDialogRef<ForgotPasswordDialogComponent>) { }

  ngOnInit() {
    // Step 1: enter email address
    this.step1Form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Step 2: enter verification code and choose new password
    this.step2Form = this.formBuilder.group({
      code: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(MIN_PW)]],
      passwordConfirm: ['', [Validators.required]]
    }, {validator: passwordMatchValidator});
  }

  onStep1Submit() {
    this.authService.forgotPassword(this.email.value).subscribe({
      next: () => {
        console.log('Verification code sent');
        this.currentStep = 2;
      },
      error: err => {
        if (err.code === 'UserNotFoundException') {
          this.emailElt.nativeElement.focus();
          this.email.setErrors([{userNotFound: true}]);
          this.snackBar.open('No account with this email address exists.');
          console.log(err);
        }
        // TODO: handle LimitedExceededException that occurs when too many password reset requests are made
        else this.errorService.handleError(err);
      }
    });
  }

  onStep2Submit() {
    this.authService.forgotPasswordSubmit(this.email.value, this.code.value, this.password.value).subscribe({
      next: () => {
        console.log('New password saved successfully');
        this.snackBar.open('Password changed successfully. You can now sign in with your new password.', undefined, {duration: 5000});
        this.dialogRef.close();
      },
      error: err => {
        if (err.code === 'CodeMismatchException') {
          this.codeElt.nativeElement.focus();
          this.code.setErrors([{invalidVerificationCode: true}]);
          this.snackBar.open('Invalid verification code, please try again.');
          console.log(err);
        }
        else this.errorService.handleError(err);
      }
    });
  }

  /* Shorthands for form controls (used by template) */
  get email() { return this.step1Form.get('email'); }
  get code() { return this.step2Form.get('code'); }
  get password() { return this.step2Form.get('password'); }
  get passwordConfirm() { return this.step2Form.get('passwordConfirm'); }

  /* For use from within template */
  get minPw() { return MIN_PW; }

  /* Called on each input in either password field. Checks whether the
   * passwordMatchValidator of the from group detected a passwordMismatch. */
  onPasswordInput() {
    if (this.step2Form.hasError('passwordMismatch'))
      this.passwordConfirm.setErrors([{'passwordMismatch': true}]);
    else
      this.passwordConfirm.setErrors(null);
  }

}
