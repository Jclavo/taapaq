import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Role } from "src/app/models/role.model";
import { RolePermission } from "src/app/models/role-permission.model";
import { Response } from "src/app/models/response.model";

//Env
import { environment } from "src/environments/environment";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiURL: string = environment.apiURL + 'roles/';
  private resultRAW: any;

  constructor(private httpClient: HttpClient,
              private authUtils: AuthUtils,
  ) { }

  // getAll(): Observable<Response> {
  //   let response = new Response();

  //   return this.httpClient.get(this.apiURL).pipe(map(res => {

  //     this.resultRAW = res;
  //     response.status = this.resultRAW.status;
  //     response.message = this.resultRAW.message;

  //     response.result = this.resultRAW.result.map(item => {

  //       let role = new Role();
  //       role.id = item.id;
  //       item.nickname ? role.name = item.nickname : role.name = item.name  ;
  //       return role;

  //     });

  //     return response;

  //   }));
  // }

  getById(id: number): Observable<Response> {

    let apiURL = this.apiURL + id;
    let response = new Response();

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      if (this.resultRAW.result) {
        let role = new Role();
        role.id = this.resultRAW.result.id;
        this.resultRAW.result.nickname ? role.name = this.resultRAW.result.nickname : role.name = this.resultRAW.result.name  ;
        response.result = role;
      }

      return response;

    }));
  }

  create(role: Role): Observable<Response> {
    let response = new Response();

    return this.httpClient.post(this.apiURL, role, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;

    }));
  }

  delete(id: number): Observable<Response> {

    let response = new Response();

    return this.httpClient.delete(this.apiURL + id, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;

    }));
    
  }

  givePermissionTo(rolePermission: RolePermission): Observable<Response> {
    let response = new Response();
    let apiURL = this.apiURL + 'givePermissionTo';

    return this.httpClient.post(apiURL, rolePermission, this.authUtils.getHeaders() ).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;

    }));
  }

  revokePermissionTo(rolePermission: RolePermission): Observable<Response> {
    let response = new Response();
    let apiURL = this.apiURL + 'revokePermissionTo';

    return this.httpClient.post(apiURL, rolePermission, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;

    }));
  }

  notInUser(user_id: number,project_id: number): Observable<Response> {
    let response = new Response();
    let apiURL = this.apiURL + 'not/users/' + user_id + '/projects/' + project_id;

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result.map(item => {

        let role = new Role();
        role.id = item.id;
        item.nickname ? role.name = item.nickname : role.name = item.name;
        return role;

      });

      return response;

    }));
  }


}
