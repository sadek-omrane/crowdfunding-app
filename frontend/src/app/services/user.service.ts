import { BaseApiService } from "./base-api.service";

export class UserService extends BaseApiService {
  protected override suffix: string = '/users';

}
