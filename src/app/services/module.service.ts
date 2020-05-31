import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Response } from "src/app/models/response.model";
import { Module } from '../models/module.model';

//Env
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private apiURL: string = environment.apiURL + 'modules/';
  private resultRAW: any;

  constructor(private httpClient: HttpClient) { }

  create(module: Module): Observable<Response> {
    let response = new Response();

    return this.httpClient.post(this.apiURL, module).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
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
}
