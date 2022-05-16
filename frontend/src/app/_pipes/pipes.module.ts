import { NgModule } from '@angular/core';
import { UserAvailableToProjectPipe } from './project-user-available.pipe';
import { UserFullNamePipe } from './user-full-name.pipe';

@NgModule({
  imports: [],
  declarations: [UserAvailableToProjectPipe, UserFullNamePipe],
  exports: [UserAvailableToProjectPipe, UserFullNamePipe],
})
export class PipesModule {}
