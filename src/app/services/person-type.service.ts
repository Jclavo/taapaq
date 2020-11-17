import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Response } from "src/app/models/response.model";
import { PersonType } from "src/app/models/person-type.model";

//Env
import { environment } from "src/environments/environment";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";

@Injectable({
  providedIn: 'root'
})
export class PersonTypeService {

  private apiURL: string = environment.apiURL + 'person-types/';
  private resultRAW: any;

  constructor(private httpClient: HttpClient,
              private authUtils: AuthUtils,
  ) { }

  getAll(): Observable<Response> {
    let response = new Response();

    return this.httpClient.get(this.apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result?.map(item => {

        let personType = new PersonType();
        personType.id = item.code;
        personType.name = item.name;
        return personType;

      });

      return response;

    }));
  }
}
