import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../../../../core/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorService} from '../../../../core/services/error.service';
import {MIN_PW} from '../../../../_helpers/constants';
import {passwordMatchValidator} from '../../../../_helpers/validators';

@Component({
  selector: 'app-auth-sign-up',
  templateUrl: './auth-sign-up.component.html',
  styleUrls: ['./auth-sign-up.component.scss']
})
export class AuthSignUpComponent implements OnInit {

  signUpForm: FormGroup;
  verificationForm: FormGroup;

  /* Trigger to hide sign-up form and display verification form. */
  signUpDataSent = false;

  /* Needed in order to programmatically set focus on an input field. See
   * https://github.com/angular/angular/issues/12463 */
  @ViewChild('emailElt') emailElt: ElementRef;
  @ViewChild('codeElt') codeElt: ElementRef;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private snackBar: MatSnackBar, private errorService: ErrorService) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(MIN_PW)]],
      passwordConfirm: ['', [Validators.required]]
    }, {validator: passwordMatchValidator});

    this.verificationForm = this.formBuilder.group({
      code: ['', [Validators.required]]
    });
  }

  onSignUpSubmit() {
    this.authService.signUp(this.email.value, this.password.value).subscribe({
      next: () => {
        console.log('Sign up successful (email verification still required)');
        this.signUpDataSent = true;
      },
      error: err => {
        if (err.code === 'UsernameExistsException') {
          this.emailElt.nativeElement.focus();
          this.email.setErrors([{emailAlreadyExists: true}]);
          this.snackBar.open('An account with this email address already exists.');
          console.log('Sign-up attempt with an already existing email address');
        }
        else this.errorService.handleError(err);
      }
    });
  }

  onVerificationSubmit() {
    this.authService.confirmSignUp(this.email.value, this.code.value).subscribe({
      next: () => {
        console.log('Email verification successful');
        this.snackBar.open('Successfully signed up. You can now sign in.');
      },
      error: err => {
        if (err.code === 'CodeMismatchException') {
          this.codeElt.nativeElement.focus();
          this.code.setErrors([{invalidVerificationCode: true}]);
          this.snackBar.open('Invalid verification code, please try again.');
        }
        else this.errorService.handleError(err);
      }
    });
  }

  resendCode() {
    this.authService.resendSignUp(this.email.value).subscribe({
      next: () => {
        console.log('Resend email verification code successful');
        this.snackBar.open('New verification code sent.');
      },
      error: err => this.errorService.handleError(err)
    });
  }


  /* Shorthands for form controls (used by template) */
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get passwordConfirm() { return this.signUpForm.get('passwordConfirm'); }
  get code() { return this.verificationForm.get('code'); }

  /* For use from within template */
  get minPw() { return MIN_PW; }

  /* Called on each input in either password field. Checks whether the
   * passwordMatchValidator of the from group detected a passwordMismatch. */
  onPasswordInput() {
    if (this.signUpForm.hasError('passwordMismatch'))
      this.passwordConfirm.setErrors([{'passwordMismatch': true}]);
    else
      this.passwordConfirm.setErrors(null);
  }

  // Dev

  printFormValue() {
    return JSON.stringify(this.signUpForm.value);
  }

}
