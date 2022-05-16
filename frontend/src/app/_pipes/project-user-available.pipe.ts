import { Pipe, PipeTransform } from "@angular/core";
import { ProjectUser } from "../_models/project-user.model";
import { User } from "../_models/user.model";

@Pipe({ name: 'userAvailableToProject' })
export class UserAvailableToProjectPipe implements PipeTransform {
  transform(value: User, projectUsers: ProjectUser[]) {
    const currentUserIds = projectUsers.map(pu => pu.userId);
    return !currentUserIds.includes(value.id);
  }
}
