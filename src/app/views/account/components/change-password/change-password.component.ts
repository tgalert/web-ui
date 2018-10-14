import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth.service';
import {MatSnackBar} from '@angular/material';
import {ErrorService} from '../../../../core/services/error.service';
import {MIN_PW} from '../../../../_helpers/constants';
import {passwordMatchValidator} from '../../../../_helpers/validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;

  loading = false;

  /* Needed in order to programmatically set focus on an input field. See
   * https://github.com/angular/angular/issues/12463 */
  @ViewChild('oldPasswordElt') oldPasswordElt: ElementRef;

  /* To correctly reset change password form after submission, see here:
   * https://stackoverflow.com/a/49789012/4747193 */
  @ViewChild(FormGroupDirective) formElt: FormGroupDirective;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private snackBar: MatSnackBar, private errorService: ErrorService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(MIN_PW)]],
      passwordConfirm: ['', [Validators.required]]
    }, {validator: passwordMatchValidator});
  }

  /* Shorthands for form controls */
  get oldPassword() { return this.form.get('oldPassword'); }
  get newPassword() { return this.form.get('password'); }
  get newPasswordConfirm() { return this.form.get('passwordConfirm'); }

  /* For use from within template */
  get minPw() { return MIN_PW; }

  onSubmit() {
    this.loading = true;
    this.authService.changePassword(this.oldPassword.value, this.newPassword.value).subscribe({
      next: () => {
        this.loading = false;
        this.formElt.resetForm();
        this.snackBar.open('Your password has been successfully changed.');
        console.log('Password change successful');
      },
      error: err => {
        this.loading = false;
        if (err.code === 'NotAuthorizedException') {
          this.oldPasswordElt.nativeElement.focus();
          this.oldPassword.setErrors([{invalidPassword: true}]);
          this.snackBar.open('The current password that you entered is incorrect.');
          console.log(err);
        }
        else this.errorService.handleError(err);
      }
    });
  }

  /* Called on each input in either "new password" field. Checks whether the
   * passwordMatchValidator of the from group detected a passwordMismatch. */
  onNewPasswordInput() {
    if (this.form.hasError('passwordMismatch'))
      this.newPasswordConfirm.setErrors([{'passwordMismatch': true}]);
    else
      this.newPasswordConfirm.setErrors(null);
  }

}
