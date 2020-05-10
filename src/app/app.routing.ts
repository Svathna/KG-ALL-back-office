import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AdminGuard } from './admin.guard';
import { SecureInnerPagesGuardGuard } from './secure-inner-pages-guard.guard';
import { HomePageComponent } from './home-page/home-page.component';


export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'user',
        canActivate: [AdminGuard],
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  {
    path: 'login',
    canActivate: [SecureInnerPagesGuardGuard],
    component: AuthPageComponent
  },
  // {
  //   path: '',
  //   component: HomePageComponent,
  // }
];
