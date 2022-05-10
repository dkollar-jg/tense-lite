import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { CallbackComponent } from './callback/callback.component';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [AppComponent, AuthButtonComponent, CallbackComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AuthModule.forRoot({
    //   domain: 'dev-jgic7c86.us.auth0.com',
    //   clientId: 'Z4XSB56FZ77jJnerZopMfBExtUD1YaTD',
    //   redirectUri: `${window.location.origin}/callback`,
    //   httpInterceptor: {
    //     allowedList: [
    //       'http://localhost:8080/*'
    //     ]
    //   }
    // }),
    HttpClientModule,
    UsersModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
