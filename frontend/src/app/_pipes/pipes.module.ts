import { NgModule } from '@angular/core';
import { ProjectNamePipe } from './project-name.pipe';
import { UserAvailableToProjectPipe } from './project-user-available.pipe';
import { UserFullNamePipe } from './user-full-name.pipe';

@NgModule({
  imports: [],
  declarations: [ProjectNamePipe, UserAvailableToProjectPipe, UserFullNamePipe],
  exports: [ProjectNamePipe, UserAvailableToProjectPipe, UserFullNamePipe],
})
export class PipesModule {}
