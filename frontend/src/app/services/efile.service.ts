import { BaseApiService } from "./base-api.service";

export class EFileService extends BaseApiService {
  protected override suffix: string = '/efiles';


  //upload file
  upload(data: any): any {
    return this.http.post(this.apiUrl + this.suffix + '/upload', data);
  }
}
