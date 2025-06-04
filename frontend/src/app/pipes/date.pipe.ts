import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "date",
})
export class DatePipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }
}
