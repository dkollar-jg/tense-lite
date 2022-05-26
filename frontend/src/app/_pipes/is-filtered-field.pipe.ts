import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isFilteredField',
})
export class IsFilteredFieldPipe implements PipeTransform {
  transform(value: any, fields: string[]): boolean {
    return fields.some((field: string) => value[field] != null);
  }
}
