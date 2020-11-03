import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Response } from "src/app/models/response.model";
import { Company } from "src/app/models/company.model";
import { Project } from "src/app/models/project.model";
import { User } from "src/app/models/user.model";
import { Role } from "src/app/models/role.model";

//Env
import { environment } from "src/environments/environment";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiURL: string = environment.apiURL + 'companies/';
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

        let company = new Company();
        company.id = item.id;
        company.name = item.person?.name;
        company.country.name = item.country?.name;
        company.country.currency = item.country?.currency;
        return company;

      });

      return response;

    }));
  }

  create(company: Company): Observable<Response> {
    let response = new Response();

    return this.httpClient.post(this.apiURL, company, this.authUtils.getHeaders()).pipe(map(res => {

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

  getMissingByProject(project_id: number): Observable<Response> {
    let response = new Response();
    let apiURL = this.apiURL + 'not/projects/' + project_id;

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result?.map(item => {

        let company = new Company();
        company.id = item.id;
        company.name = item.name;
        return company;

      });

      return response;

    }));
  }
}
