import { BaseApiService } from "./base-api.service";

export class PageContentService extends BaseApiService {
  protected override suffix: string = '/page-contents';

}
