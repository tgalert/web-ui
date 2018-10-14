import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../../core/services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {ErrorService} from '../../../../../core/services/error.service';

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss']
})
export class ToolbarMenuComponent implements OnInit {

  loading = false;

  constructor(private authService: AuthService, private router: Router,
              private snackBar: MatSnackBar, private errorService: ErrorService) { }

  ngOnInit() {
  }

  signOut() {
    this.loading = true;
    this.authService.signOut().subscribe({
      next: () => {
        // No need to hide loading spinner, because we navigate away
        this.snackBar.open('You have been signed out.');
        this.router.navigate(['/']);
        console.log('Sign-out successful');
      },
      error: err => {
        this.loading = false;
        this.errorService.handleError(err);
      }
    });
  }

  navigateToAccountSettings() {
    this.loading = true;
    this.router.navigate(['/account']);
  }
}
