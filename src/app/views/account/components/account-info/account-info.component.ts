import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../core/services/auth.service';
import {ErrorService} from '../../../../core/services/error.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  email: string;

  constructor(private authService: AuthService, private errorService: ErrorService) { }

  ngOnInit() {
    this.authService.getUserInfo().subscribe({
      next: info => this.email = info.email,
      error: err => this.errorService.handleError(err)
    });
  }

}
