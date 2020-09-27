import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Response } from "src/app/models/response.model";
import { Locale } from "src/app/models/locale.model";

//Env
import { environment } from "src/environments/environment";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  private apiURL: string = environment.apiURL + 'locales/';
  private resultRAW: any;

  constructor(private httpClient: HttpClient,
    private authUtils: AuthUtils,
  ) { }

  get(): Observable<Response> {

    let response = new Response();

    return this.httpClient.get(this.apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result?.map(responseTranslation => {

        let locale = new Locale();
        locale.id = responseTranslation.id;
        locale.code = responseTranslation.code;
        locale.language = responseTranslation.language;

        return locale;
      });

      return response;
    }));
  }

}
