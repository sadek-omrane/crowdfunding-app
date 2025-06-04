import { BaseApiService } from "./base-api.service";

export class PartnerService extends BaseApiService {
  protected override suffix: string = '/partners';

}
