import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token'); // Replace this with your token retrieval logic
        },
        allowedDomains: ['example.com'], // Replace with your domain(s)
        disallowedRoutes: ['example.com/auth/'] // Replace with your disallowed route(s)
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
