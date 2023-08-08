import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(x => x.HomeModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(x => x.AuthenticationModule),
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule),
        canActivate: [AuthGuard],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
