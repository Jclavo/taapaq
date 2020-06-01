import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Response } from "src/app/models/response.model";
import { Company } from "src/app/models/company.model";
import { Project } from "src/app/models/project.model"

//Env
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiURL: string = environment.apiURL + 'companies/';
  private resultRAW: any;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Response> {
    let response = new Response();

    return this.httpClient.get(this.apiURL).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result.map(item => {

        let company = new Company();
        company.id = item.id;
        company.name = item.name;
        return company;

      });

      return response;

    }));
  }

  create(company: Company): Observable<Response> {
    let response = new Response();

    return this.httpClient.post(this.apiURL, company).pipe(map(res => {

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

  getProjectByCompany(company_id: number){
    let response = new Response();
    let apiURL = this.apiURL + company_id + '/projects'

    return this.httpClient.get(apiURL).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      if(this.resultRAW.result){
        let company = new Company();
        company.id = this.resultRAW.result.id;
        company.name = this.resultRAW.result.name;

        company.projects = this.resultRAW.result.projects.map(responseProject => {

          let project = new Project();
          project.id = responseProject.id;
          project.name = responseProject.name;
          return project;
  
        });

        response.result = company;
      }

      return response;

    }));
  }
}
