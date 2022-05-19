import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    NavigationComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
  ],
})
export class LayoutModule {}
