import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav-wrapper',
  templateUrl: './sidenav-wrapper.component.html',
  styleUrls: ['./sidenav-wrapper.component.scss']
})
export class SidenavWrapperComponent {

  isExpanded: boolean = true;

  navList: any = [
    {
      navLink: "dashboard",
      icon: "grid_view",
      navName: "Dashboard"
    },{
      navLink: "user",
      icon: "account_balance",
      navName: "Standard Management"
    },{
      navLink: "user1",
      icon: "supervisor_account",
      navName: "Re-Train ML Mode"
    },{
      navLink: "user2",
      icon: "supervisor_account",
      navName: "Register Employee"
    },{
      navLink: "user3",
      icon: "supervisor_account",
      navName: "Authorization\nManagement"
    },{
      navLink: "user4",
      icon: "menu",
      navName: "DataSet Management"
    },
  ]

  constructor() {}

}
