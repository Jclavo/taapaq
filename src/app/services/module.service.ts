import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Response } from "src/app/models/response.model";
import { Module } from "src/app/models/module.model";
import { Resource } from "src/app/models/resource.model";

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
      if (this.resultRAW.result) {
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

  getByUser(): Observable<Response> {
    let response = new Response();
    let apiURL = this.apiURL + 'user';

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      const mapModulesChildren = (responseModule) => {

        let module = new Module();
        module.id = responseModule.id;
        module.name = responseModule.nickname;
        module.url = responseModule.url;
        module.project_id = responseModule.project_id;
        module.labeled = responseModule.labeled;
        module.parent_id = responseModule.parent_id;
        module.icon = responseModule.icon;

        module.children = responseModule.children?.map(mapModulesChildren);

        return module;

      };

      response.result = this.resultRAW.result?.map(mapModulesChildren);

      //Filter only taapaq menu
      response.result =  response.result.filter(function(module: Module) {
        return module.name.toLowerCase().includes("taapaq".toLowerCase());
      });

      if(response.result.length > 0){
        response.result = response.result[0].children;
      }

      return response;

    }));
  }

  getResourcesByProject(project_id: number) {

    let response = new Response();
    let apiURL = this.apiURL + 'resources/projects/' + project_id;

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      const mapModulesChildren = (responseModule) => {

        let module = new Module();
        module.id = responseModule.id;
        module.name = responseModule.name;
        module.url = responseModule.url;
        module.project_id = responseModule.project_id;
        module.labeled = responseModule.labeled;
        module.parent_id = responseModule.parent_id;

        module.resources = responseModule.resources?.map(responseResource => {

          let resource = new Resource();
          resource.id = responseResource.id;
          resource.name = responseResource.name;
          resource.module_id = responseResource.module_id;

          return resource;

        });

        module.children = responseModule.children?.map(mapModulesChildren);

        return module;

      };

      response.result = this.resultRAW.result?.map(mapModulesChildren);

      return response;

    }));

  }

  getLabelsByProject(project_id: number) {

    let response = new Response();
    let apiURL = this.apiURL + 'labels/projects/' + project_id;

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result?.map(responseModule => {

        let module = new Module();
        module.id = responseModule.id;
        module.name = responseModule.name;
        return module;
      });

      return response;

    }));

  }
}
