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
export class ResourceService {

  private apiURL: string = environment.apiURL + 'resources/';
  private resultRAW: any;

  constructor(private httpClient: HttpClient) { }

  create(resource: Resource): Observable<Response> {
    let response = new Response();

    return this.httpClient.post(this.apiURL, resource).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;

    }));
  }

}
