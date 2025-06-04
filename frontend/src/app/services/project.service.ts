import { Observable } from "rxjs";
import { BaseApiService } from "./base-api.service";
import { Project } from "../models/project";
import { HttpParams } from "@angular/common/http";

export class ProjectService extends BaseApiService {
  protected override suffix: string = '/projects';

  getMyProjects(params?:any): Observable<Project[]> {
    const options = { params: new HttpParams().appendAll(params) };
    return this.http.get<Project[]>(this.apiUrl + this.suffix + '/my-projects', options);
  }

  similar(id: number): Observable<Project> {
    return this.http.get<Project>(this.apiUrl+this.suffix+ '/' + id + '/similar');
  }


}
