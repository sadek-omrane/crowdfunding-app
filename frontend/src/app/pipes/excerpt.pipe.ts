import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "excerpt",
})
export class ExcerptPipe implements PipeTransform {
  //
  transform(value: string, limit: number): string {
    if (!value) {
      return "";
    }
    if (typeof value !== "string") {
      return value;
    }
    // transform the value to capitalize the first letter
    value = value.charAt(0).toUpperCase() + value.slice(1);
    if (value.length > limit) {
      return value.substring(0, limit) + "...";
    }
    return value;
  }
}
