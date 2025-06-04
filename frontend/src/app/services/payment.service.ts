import { Observable } from "rxjs";
import { BaseApiService } from "./base-api.service";

export class PaymentService extends BaseApiService {
  protected override suffix: string = '/payments';

  createPaymentIntent(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+this.suffix+'/create-payment-intent', data);
  }
}
