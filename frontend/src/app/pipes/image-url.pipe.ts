import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "src/environments/environment.development";

@Pipe({
  name: "imageUrl",
})
export class ImageUrlPipe implements PipeTransform {
  transform(value: number): string {
    return environment.imageUrl + "/" + value;
  }
}
