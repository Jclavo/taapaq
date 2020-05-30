import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Permission } from "src/app/models/permission.model";
import { Response } from "src/app/models/response.model";

//Env
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private apiURL: string = environment.apiURL + 'permissions/';
  private resultRAW: any;

  constructor(private httpClient: HttpClient) { }

  getAllPermissionsByRole(role_id: number): Observable<Response> {
    let response = new Response();
    let apiURL = this.apiURL + 'getAllByRole';

    return this.httpClient.post(apiURL, {'role_id' : role_id}).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result.map(item => {

        let permission = new Permission();
        permission.id = item.id;
        permission.name = item.name;
        permission.roleHasPermission = item.user_has_role;
        return permission;

      });

      return response;

    }));
  }

  getAll(): Observable<Response> {
    let response = new Response();

    return this.httpClient.get(this.apiURL).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result.map(item => {

        let permission = new Permission();
        permission.id = item.id;
        permission.name = item.name;
        return permission;

      });

      return response;

    }));
  }

  create(permission: Permission): Observable<Response> {
    let response = new Response();

    return this.httpClient.post(this.apiURL, permission).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;

    }));
  }
}
