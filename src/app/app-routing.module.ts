import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(x => x.HomeModule),
      },
      {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(x => x.AuthenticationModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
