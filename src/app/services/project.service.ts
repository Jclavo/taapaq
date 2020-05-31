import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Response } from "src/app/models/response.model";
import { Project } from "src/app/models/project.model";
import { Module } from '../models/module.model';

//Env
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiURL: string = environment.apiURL + 'projects/';
  private resultRAW: any;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Response> {
    let response = new Response();

    return this.httpClient.get(this.apiURL).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result.map(item => {

        let project = new Project();
        project.id = item.id;
        project.name = item.name;
        return project;

      });

      return response;

    }));
  }

  create(project: Project): Observable<Response> {
    let response = new Response();

    return this.httpClient.post(this.apiURL, project).pipe(map(res => {

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

  getModulesByProject(project_id: number){

    let response = new Response();
    let apiURL = this.apiURL + 'withModules/' + project_id;

    return this.httpClient.get(apiURL).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      if(this.resultRAW.result){

        let project = new Project();
        project.id = this.resultRAW.result.id;
        project.name = this.resultRAW.result.name;

        project.modules = this.resultRAW.result.modules?.map(item => {
            let module = new Module();
            module.id = item.id;
            module.name = item.name;
            module.url = item.url;
            module.project_id = item.project;
            return module;
        });

        response.result = project;
      }
      return response;

    }));

  }
} 
