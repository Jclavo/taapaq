import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Response } from "src/app/models/response.model";
import { Module } from '../models/module.model';

//Env
import { environment } from "src/environments/environment";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private apiURL: string = environment.apiURL + 'modules/';
  private resultRAW: any;

  constructor(private httpClient: HttpClient,
              private authUtils: AuthUtils,
  ) { }

  create(module: Module): Observable<Response> {
    let response = new Response();

    return this.httpClient.post(this.apiURL, module, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      if(this.resultRAW.result){
        let module = new Module();
        module.id = this.resultRAW.result.id;
        module.name = this.resultRAW.result.name;
        module.project_id = this.resultRAW.result.project_id;

        response.result = module;
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

  getByUser(user_id: number): Observable<Response> {
    let response = new Response();
    let apiURL = this.apiURL + 'users/' + user_id;

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result.map(item => {

        let module = new Module();
        module.id = item.id;
        module.name = item.name;
        module.url = item.url;
        // module.icon = item.icon;
        module.icon = 'apps'
        return module;

      });

      return response;

    }));
  }
}
