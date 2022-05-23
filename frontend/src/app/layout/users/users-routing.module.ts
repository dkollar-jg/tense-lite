import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListResolver } from '../../_resolvers/project-list.resolver';
import { ProjectUserListByUserResolver } from '../../_resolvers/project-user-list-by-user.resolver';
import { UserListResolver } from '../../_resolvers/user-list.resolver';
import { UserResolver } from '../../_resolvers/user.resolver';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UsersComponent,
        children: [
          {
            path: '',
            component: UserListComponent,
            resolve: {
              users: UserListResolver,
            },
          },
          {
            path: ':id',
            component: UserComponent,
            resolve: {
              projects: ProjectListResolver,
              projectUsers: ProjectUserListByUserResolver,
              user: UserResolver,
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
