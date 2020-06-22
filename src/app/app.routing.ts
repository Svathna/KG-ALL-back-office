import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AdminGuard } from './admin.guard';
import { SecureInnerPagesGuardGuard } from './secure-inner-pages-guard.guard';
import { CompanysComponent } from './companys/companys.component';
import { CompanyDetailComponent } from './companys/company-detail/company-detail.component';
import { RequestsComponent } from './requests/requests.component';


export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'company',
        canActivate: [AdminGuard],
        pathMatch: 'full'
      },
      {
        path: 'company',
        component: CompanysComponent
      },
      {
        path: 'company-detail/:id',
        component: CompanyDetailComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'request',
        component: RequestsComponent
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
];
