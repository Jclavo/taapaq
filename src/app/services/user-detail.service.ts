import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Response } from "src/app/models/response.model";
import { UserDetail } from "src/app/models/user-detail";

//Env
import { environment } from "src/environments/environment";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  private apiURL: string = environment.apiURL + 'user-details/';
  private resultRAW: any;

  constructor(private httpClient: HttpClient,
              private authUtils: AuthUtils
  ) { }

  getAll(): Observable<Response> {
    let response = new Response();

    return this.httpClient.get(this.apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result?.map(item => {

        let user = new UserDetail();
        user.id = item.id;
        user.identification = item.identification;
        user.email = item.email;
        user.name = item.name;
        user.lastname = item.lastname;
        user.fullname = item.name + ' ' + item.lastname;
        user.phone = item.phone;
        user.address = item.address;

        return user;

      });

      return response;

    }));
  }

  create(user: UserDetail): Observable<Response> {
    let response = new Response();

    return this.httpClient.post(this.apiURL, user, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;

    }));
  }

}
