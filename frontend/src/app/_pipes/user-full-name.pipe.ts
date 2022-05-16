import { Pipe, PipeTransform } from "@angular/core";
import { UsersService } from "../_services/users.service";

@Pipe({ name: 'userFullName' })
export class UserFullNamePipe implements PipeTransform {
  constructor(private usersService: UsersService) {}

  transform(value: number): string {
    const users = this.usersService.getUsers();
    const user = users.find(u => u.id === value);
    return `${user?.firstName} ${user?.lastName}`;
  }
}