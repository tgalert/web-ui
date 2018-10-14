import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../../../../../core/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorService} from '../../../../../core/services/error.service';
import {MIN_PW} from '../../../../../_helpers/constants';
import {passwordMatchValidator} from '../../../../../_helpers/validators';
import {mergeMap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  verificationForm: FormGroup;

  /* Trigger to display loading spinner */
  loading = false;

  /* Trigger display code verification form and hide sign-up form */
  codeVerification = false;

  /* Needed in order to programmatically set focus on an input field. See
   * https://github.com/angular/angular/issues/12463 */
  @ViewChild('emailElt') emailElt: ElementRef;
  @ViewChild('codeElt') codeElt: ElementRef;

  @Output() showSignIn = new EventEmitter<undefined>();

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private snackBar: MatSnackBar, private errorService: ErrorService,
              private router: Router) { }

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
    this.loading = true;
    this.authService.signUp(this.email.value, this.password.value).subscribe({
      next: () => {
        this.loading = false;
        this.codeVerification = true;
        console.log('Sign up successful (email verification still required)');
      },
      error: err => {
        this.loading = false;
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
    this.loading = true;
    this.authService.confirmSignUp(this.email.value, this.code.value).pipe(
        mergeMap(() => {
          console.log('Email verification successful');
          return this.authService.signIn(this.email.value, this.password.value);
        })
    ).subscribe({
      next: () => {
        // Since we're navigating away, we don't need to stop the spinner
        this.router.navigate(['/dashboard']);
        this.snackBar.open('Your account has been created');
        console.log('Sign-in successful');
      },
      error: err => {
        this.loading = false;
        if (err.code === 'CodeMismatchException') {
          this.codeElt.nativeElement.focus();
          this.code.setErrors([{invalidVerificationCode: true}]);
          this.snackBar.open('Invalid verification code, please try again.');
          console.log('Wrong sign-up verification code');
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
}
