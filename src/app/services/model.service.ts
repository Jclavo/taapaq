import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Response } from "src/app/models/response.model";
import { Model } from "src/app/models/model.model";

//Env
import { environment } from "src/environments/environment";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private apiURL: string = environment.apiURL + 'models/';
  private resultRAW: any;

  constructor(private httpClient: HttpClient,
    private authUtils: AuthUtils,
  ) { }

  create(model: Model): Observable<Response> {
    let response = new Response();

    return this.httpClient.post(this.apiURL, model, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      if (this.resultRAW.result) {
        let model = new Model();
        model.id = this.resultRAW.result.id;
        model.name = this.resultRAW.result.name;
        model.project_id = this.resultRAW.result.project_id;

        response.result = model;
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

  getByProject(project_id: number) {

    let response = new Response();
    let apiURL = this.apiURL + 'projects/' + project_id;

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result?.map(responseModule => {

        let model = new Model();
        model.id = responseModule.id;
        model.name = responseModule.name;
        model.project_id = responseModule.project_id;
        return model;
      });


      return response;

    }));

  }
}
