import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Permission } from "src/app/models/permission.model";
import { Response } from "src/app/models/response.model";

//Env
import { environment } from "src/environments/environment";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private apiURL: string = environment.apiURL + 'permissions/';
  private resultRAW: any;

  constructor(private httpClient: HttpClient,
              private authUtils: AuthUtils,
  ) { }

  getByRole(role_id: number): Observable<Response> {
    let response = new Response();
    let apiURL = this.apiURL + 'roles/' + role_id;

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result?.map(item => {

        let permission = new Permission();
        permission.id = item.id;
        permission.name = item.name;
        permission.roleHasPermission = item.role_has_permission ? item.role_has_permission : false;
        return permission;

      });

      return response;

    }));
  }

  getAll(): Observable<Response> {
    let response = new Response();

    return this.httpClient.get(this.apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result?.map(item => {

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

    return this.httpClient.post(this.apiURL, permission, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;

    }));
  }
}
