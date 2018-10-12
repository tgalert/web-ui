import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-tabs',
  templateUrl: './auth-tabs.component.html',
  styleUrls: ['./auth-tabs.component.scss']
})
export class AuthTabsComponent implements OnInit {

  selectedTab = 0;

  constructor() { }

  ngOnInit() {
  }

  onTabChanged(newIndex: number) {
    this.selectedTab = newIndex;
  }

}
