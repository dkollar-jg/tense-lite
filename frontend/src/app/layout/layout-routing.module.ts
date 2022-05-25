import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../_guards/auth.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'time-entries', pathMatch: 'prefix' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'projects',
        loadChildren: () =>
          import('./projects/projects.module').then((m) => m.ProjectsModule),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'BASIC'] },
      },
      {
        path: 'time-entries',
        loadChildren: () =>
          import('./time-entries/time-entries.module').then(
            (m) => m.TimeEntriesModule
          ),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'BASIC'] },
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'BASIC'] },
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
