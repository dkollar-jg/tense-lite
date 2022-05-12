import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  dateToString(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  stringToDate(date: string): Date | undefined {
    if (date) {
      const [year, month, day] = date.split('-');
      return new Date(+year, +month - 1, +day);
    }
    return undefined;
  }
}