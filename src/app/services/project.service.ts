import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Response } from "src/app/models/response.model";
import { Project } from "src/app/models/project.model";
import { Module } from "src/app/models/module.model";
import { Resource } from "src/app/models/resource.model";
import { ProjectCompany } from "src/app/models/project-company.model";
import { Company } from "src/app/models/company.model";

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

  assignCompany(project_company: ProjectCompany){

    let response = new Response();
    let apiURL = this.apiURL + 'assignCompany';

    return this.httpClient.post(apiURL, project_company).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;

    }));

  }

  getModulesResourcesByProject(project_id: number){

    let response = new Response();
    let apiURL = this.apiURL + project_id + '/modules/resources';

    return this.httpClient.get(apiURL).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      if(this.resultRAW.result){

        let project = new Project();
        project.id = this.resultRAW.result.id;
        project.name = this.resultRAW.result.name;

        project.modules = this.resultRAW.result.modules?.map(responseItem => {
          
            let module = new Module();
            module.id = responseItem.id;
            module.name = responseItem.name;
            module.url = responseItem.url;
            module.project_id = responseItem.project;

            module.resources = responseItem.resources?.map(responseResource => {

              let resource = new Resource();
              resource.id = responseResource.id;
              resource.name = responseResource.name;
              resource.module_id = responseResource.module_id;

              return resource;

            });

            return module;
        });

        response.result = project;
      }
      return response;

    }));

  }

  getProjectsCompanies(){

    let response = new Response();
    let apiURL = this.apiURL + 'companies'

    return this.httpClient.get(apiURL).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result.map(responseProjects => {

        let project = new Project();
        project.id = responseProjects.id;
        project.name = responseProjects.name;
        
        project.companies = responseProjects.companies.map(responseCompanies => {

          let company = new Company();
          company.id = responseCompanies.id;
          company.name = responseCompanies.name;
          
          return company;
        });

        return project;

      });

      return response;

    }));

  }
} 
