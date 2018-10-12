import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../../core/services/auth.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ErrorService} from '../../../../../core/services/error.service';
import {Router} from '@angular/router';
import {ForgotPasswordDialogComponent} from './forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  loading = false;

  /* Needed in order to programmatically set focus on an input field. See
   * https://github.com/angular/angular/issues/12463 */
  @ViewChild('emailElt') emailElt: ElementRef;
  @ViewChild('passwordElt') passwordElt: ElementRef;

  @Output() showSignUp = new EventEmitter<undefined>();

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private snackBar: MatSnackBar, private errorService: ErrorService,
              private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.loading = true;
    this.authService.signIn(this.email.value, this.password.value).subscribe({
      next: () => {
        // Note: since we navigate away, we don't need to stop the spinner
        console.log('Sign-in successful');
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.loading = false;
        if (err.code === 'UserNotFoundException') {
          this.emailElt.nativeElement.focus();
          this.email.setErrors([{userNotFound: true}]);
          this.snackBar.open('No account with this email address exists.');
          console.log(err);
        }
        else if (err.code === 'NotAuthorizedException') {
          this.passwordElt.nativeElement.focus();
          this.password.setErrors([{invalidPassword: true}]);
          this.snackBar.open('Password incorrect.');
          console.log(err);
        }
        else this.errorService.handleError(err);
      }
    });
  }

  forgotPassword() {
    this.dialog.open(ForgotPasswordDialogComponent, {
      width: '35em'
    });
  }

  /* Shorthands for form controls (used by template) */
  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }


  // Dev

  printFormValue() {
    return JSON.stringify(this.signInForm.value);
  }


}
