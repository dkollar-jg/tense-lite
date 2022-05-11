import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListResolver } from '../../../_resolvers/project-list.resolver';
import { ProjectResolver } from '../../../_resolvers/project.resolver';
import { ProjectComponent } from '../project/project.component';
import { ProjectsComponent } from '../projects.component';
import { ProjectListComponent } from './project-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    children: [
      {
        path: '',
        component: ProjectsComponent,
        children: [
          {
            path: '',
            component: ProjectListComponent,
            resolve: {
              projects: ProjectListResolver,
            },
          },
          {
            path: ':id',
            component: ProjectComponent,
            resolve: {
              project: ProjectResolver,
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
export class ProjectsRoutingModule {}
