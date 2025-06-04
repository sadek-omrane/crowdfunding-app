import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class BaseApiService {

  protected apiUrl = environment.apiUrl;

  protected suffix = '';

  constructor(protected http: HttpClient) {}

  post<T>(data: any): any {
    return this.http.post<T>(this.apiUrl + this.suffix, data);
  }

  get<T>(id?: number, params?:any): any {
    if(id){
      return this.http.get<T>(this.apiUrl + this.suffix + '/'+id);
    }else{
      const options = { params: new HttpParams().appendAll(params) };
      return this.http.get<T>(this.apiUrl + this.suffix, options);
    }
  }

  put<T>(id: number,data: any): any {
    return this.http.put<T>(this.apiUrl + this.suffix + '/'+id, data);
  }

  delete<T>(id: number): any {
    return this.http.delete<T>(this.apiUrl + this.suffix + '/'+id);
  }

  patch<T>(id: number,data: any): any {
    return this.http.patch<T>(this.apiUrl + this.suffix +'/'+ id, data);
  }
}
