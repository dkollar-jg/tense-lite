import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../_models/user.model';

@Pipe({ name: 'userFullName' })
export class UserFullNamePipe implements PipeTransform {
  transform(value: number, users: User[]): string {
    const user = users.find((u) => u.id === value);
    return `${user?.firstName} ${user?.lastName}`;
  }
}
