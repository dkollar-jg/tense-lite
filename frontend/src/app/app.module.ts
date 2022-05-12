import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { CallbackComponent } from './callback/callback.component';
import { UsersModule } from './layout/users/users.module';

@NgModule({
  declarations: [AppComponent, AuthButtonComponent, CallbackComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
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
    // FormsModule,
    HttpClientModule,
    // ReactiveFormsModule,
    UsersModule,
    BrowserAnimationsModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
