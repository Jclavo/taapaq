import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Response } from "src/app/models/response.model";
import { Resource } from "src/app/models/resource.model";

//Env
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResourceCommonService {

  
  private apiURL: string = environment.apiURL + 'resource-commons/';
  private resultRAW: any;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Response> {
    let response = new Response();

    return this.httpClient.get(this.apiURL).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result.map(item => {

        let resource = new Resource();
        resource.id = item.id;
        resource.name = item.name;
        return resource;

      });

      return response;

    }));
  }
}
