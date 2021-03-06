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

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL: string = environment.apiURL + 'users/';
  private resultRAW: any;

  constructor(private httpClient: HttpClient,
    private authUtils: AuthUtils,
  ) { }

  login(user: User): Observable<Response> {

    let apiURL = environment.apiURL + 'login';
    let response = new Response();

    //Encrypt
    user.password = btoa(user.myPassword);

    return this.httpClient.post(apiURL, user, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      if (this.resultRAW.result) {
        let user = new User();
        user.id = this.resultRAW.result.id;
        user.login = this.resultRAW.result.login;
        user.token = this.resultRAW.result.api_token;
        user.isSuper = this.resultRAW.result.isSuper;

        user.company_id = this.resultRAW.result.company_project?.company_id;
        user.project_id = this.resultRAW.result.company_project?.project_id;

        // User Detail
        user.info.identification = this.resultRAW.result.person?.identification;
        user.info.email = this.resultRAW.result.person?.email;
        user.info.name = this.resultRAW.result.person?.name;
        user.info.lastname = this.resultRAW.result.person?.lastname;
        // user.info.fullname = user.info.name + ' ' + user.info.lastname;
        user.info.setFullname();
        user.info.phone = this.resultRAW.result.person?.phone;
        user.info.address = this.resultRAW.result.person?.address;

        //Company
        user.company.id = this.resultRAW.result.company?.id;
        user.company.name = this.resultRAW.result.company?.person?.name;

        //Country
        user.company.country.id = this.resultRAW.result.company?.person?.country?.id;
        user.company.country.code = this.resultRAW.result.company?.person?.country?.code;
        user.company.country.name = this.resultRAW.result.company?.person?.country?.name;

        response.result = user;
      }

      return response;

    }));
  }

  logout(): Observable<Response> {

    let apiURL = environment.apiURL + 'logout';
    let response = new Response();

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      return response;

    }));
  }


  create(user: User): Observable<Response> {
    let response = new Response();

    return this.httpClient.post(this.apiURL, user, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      if (this.resultRAW.data) {
        let user = new User();
        user.id = this.resultRAW.data.id;
        // user.name = this.resultRAW.data.name;
        // user.email = this.resultRAW.data.email;
        user.login = this.resultRAW.data.login;
      }

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

  getUserRolesByProjectCompany(project_id: number, company_id: number) {

    let response = new Response();
    let apiURL = this.apiURL + 'roles/companies/' + company_id + '/projects/' + project_id;

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result?.map(item => {

        let user = new User();
        user.id = item.id;
        user.login = item.login;
        user.activated = item.activated;

        user.info.identification = item.user_detail?.identification;
        user.info.email = item.user_detail?.email;
        user.info.name = item.user_detail?.name;
        user.info.lastname = item.user_detail?.lastname;
        user.info.setFullname();
        user.info.phone = item.user_detail?.phone;
        user.info.address = item.user_detail?.address;


        user.roles = item.roles?.map(itemRole => {
          let role = new Role();
          role.id = itemRole.id;
          itemRole.nickname ? role.name = itemRole.nickname : role.name = itemRole.name;
          return role;

        });

        return user;
      });
      return response;

    }));
  }

  removeRole(userRole: UserRole) {
    let response = new Response();
    let apiURL = this.apiURL + 'removeRole';

    return this.httpClient.post(apiURL, userRole, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;

    }));
  }

  assignRole(userRole: UserRole) {
    let response = new Response();
    let apiURL = this.apiURL + 'assignRole';

    return this.httpClient.post(apiURL, userRole, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;

    }));
  }

  changeActivatedStatus(id: number): Observable<Response> {
    let response = new Response();
    let apiURL = this.apiURL + id + '/changeActivatedStatus';

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;

    }));
  }
}
