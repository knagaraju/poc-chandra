import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard-new/components/home/home.component';
import { LoginComponent } from './login/login.component';
import { SidenavWrapperComponent } from './dashboard/components/sidenav-wrapper/sidenav-wrapper.component';
import { authGuard } from './dashboard-new/core/guards/auth.guard';
import { logoutGuard } from './dashboard-new/core/guards/logout.guard';

const routes: Routes = [
  // lazy loaded dashboard module
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [logoutGuard]
  },
  {
    path: '',
    component: SidenavWrapperComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [authGuard]
      },
    ]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
