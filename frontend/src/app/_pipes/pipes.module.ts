import { NgModule } from '@angular/core';
import { IsFilteredFieldPipe } from './is-filtered-field.pipe';
import { ProjectNamePipe } from './project-name.pipe';
import { UserAvailableToProjectPipe } from './project-user-available.pipe';
import { UserFullNamePipe } from './user-full-name.pipe';

@NgModule({
  imports: [],
  declarations: [
    ProjectNamePipe,
    UserAvailableToProjectPipe,
    UserFullNamePipe,
    IsFilteredFieldPipe,
  ],
  exports: [
    IsFilteredFieldPipe,
    ProjectNamePipe,
    UserAvailableToProjectPipe,
    UserFullNamePipe,
  ],
})
export class PipesModule {}
