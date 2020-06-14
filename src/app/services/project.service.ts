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
import { Role } from "src/app/models/role.model";

//Env
import { environment } from "src/environments/environment";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiURL: string = environment.apiURL + 'projects/';
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

    return this.httpClient.post(this.apiURL, project, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
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

  assignCompany(project_company: ProjectCompany) {

    let response = new Response();
    let apiURL = this.apiURL + 'assignCompany';

    return this.httpClient.post(apiURL, project_company, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;
    }));
  }

  removeCompany(project_company: ProjectCompany) {

    let response = new Response();
    let apiURL = this.apiURL + 'removeCompany';

    return this.httpClient.post(apiURL, project_company, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;
      return response;
    }));
  }

  getProjectsCompanies() {

    let response = new Response();
    let apiURL = this.apiURL + 'companies'

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result?.map(responseProjects => {

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

  getCompaniesByProject(project_id: number) {

    let response = new Response();
    let apiURL = this.apiURL + project_id + '/companies'

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      if (this.resultRAW.result) {

        let project = new Project();
        project.id = this.resultRAW.result?.id;
        project.name = this.resultRAW.result?.name;

        project.companies = this.resultRAW.result?.companies.map(responseCompanies => {

          let company = new Company();
          company.id = responseCompanies.id;
          company.name = responseCompanies.name;

          return company;
        });

        response.result = project

      }
      return response;

    }));
  }

  getRolesByProject(project_id: number): Observable<Response> {
    let response = new Response();
    let apiURL = this.apiURL + project_id + '/roles';

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      if (this.resultRAW.result) {

        let project = new Project();
        project.id = this.resultRAW.result.id;
        project.name = this.resultRAW.result.name;

        project.roles = this.resultRAW.result.roles.map(item => {

          let role = new Role();
          role.id = item.id;
          item.nickname ? role.name = item.nickname : role.name = item.name  ;
          return role;
        });

        response.result = project;
      }
      return response;

    }));
  }
} 
