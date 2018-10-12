import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../../core/services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss']
})
export class ToolbarMenuComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  signOut() {
    this.authService.signOut().subscribe({
      next: () => {
        console.log('Sign-out successful');
        this.snackBar.open('You have been signed out.');
        this.router.navigate(['/']);
      }
    });
  }

}
