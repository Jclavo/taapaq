import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Role } from "src/app/models/role.model";
import { Response } from "src/app/models/response.model";

//Env
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiURL: string = environment.apiURL + 'roles';
  private resultRAW: any;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Response> {
    let response = new Response();

    return this.httpClient.get(this.apiURL).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result.map(item => {

        let role = new Role();
        role.id = item.id;
        role.name = item.name;
        return role;

      });

      return response;

    }));
  }
}
