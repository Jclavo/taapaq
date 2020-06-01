import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Response } from "src/app/models/response.model";
import { User } from "src/app/models/user.model";
import { UserRole } from "src/app/models/user-role.mode";
import { Role } from "src/app/models/role.model";

//Env
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL: string = environment.apiURL + 'users/';
  private resultRAW: any;

  constructor(private httpClient: HttpClient) { }

  login(user: User): Observable<Response> {

    let apiURL = environment.apiURL + 'login';
    let response = new Response();

    return this.httpClient.post(apiURL, user).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      if (this.resultRAW.result) {
        let user = new User();
        user.id = this.resultRAW.result.id;
        user.login = this.resultRAW.result.login;

        user.company_id = this.resultRAW.result.company_project.company_id;
        user.project_id = this.resultRAW.result.company_project.project_id;

        response.result = user;
      }

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

        let user = new User();
        user.id = item.id;
        user.name = item.name;
        user.email = item.email;
        user.login = item.login;

        return user;

      });

      return response;

    }));
  }

  getAllWithRoles(): Observable<Response> {

    let response = new Response();
    let apiURL = this.apiURL + 'withRoles';

    return this.httpClient.get(apiURL).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result.map(item => {

        let user = new User();
        user.id = item.id;
        user.name = item.name;
        user.email = item.email;
        user.login = item.login;

        user.roles = item.roles.map(itemRole => {
          let role = new Role();
          role.id = itemRole.id;
          role.name = itemRole.name;
          return role;

        });

        return user;

      });

      return response;

    }));
  }

  create(user: User): Observable<Response> {
    let response = new Response();

    return this.httpClient.post(this.apiURL, user).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      if (this.resultRAW.data) {
        let user = new User();
        user.id = this.resultRAW.data.id;
        user.name = this.resultRAW.data.name;
        user.email = this.resultRAW.data.email;
        user.login = this.resultRAW.data.login;
      }

      return response;

    }));
  }

  delete(id: number): Observable<Response> {

    let response = new Response();

    return this.httpClient.delete(this.apiURL + id).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;

    }));
    
  }

  removeRole(userRole: UserRole){
    let response = new Response();
    let apiURL = this.apiURL + 'removeRole';

    return this.httpClient.post(apiURL, userRole).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;

    }));
  }

  assignRole(userRole: UserRole){
    let response = new Response();
    let apiURL = this.apiURL + 'assignRole';

    return this.httpClient.post(apiURL, userRole).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;

    }));
  }
}
