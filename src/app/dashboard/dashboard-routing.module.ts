import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InfoComponent } from './components/info/info.component';
import { UserComponent } from './components/user/user.component';
import { SidenavWrapperComponent } from './components/sidenav-wrapper/sidenav-wrapper.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  // Sidenavwrapper Component acts like a shell & the active child Component gets rendered into the <router-outlet>
  {
    path: '',
    component: DashboardComponent
  },{
    path: 'profile',
    component: ProfileComponent
  },
  // {
  //   path: '**',
  //   redirectTo: '/dashboard',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
