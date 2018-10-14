import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  loading = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToDashboard() {
    this.loading = true;
    this.router.navigate(['/dashboard']);
  }
}
