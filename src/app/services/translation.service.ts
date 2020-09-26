import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

//Models
import { Response } from "src/app/models/response.model";
import { Translation } from "src/app/models/translation.model";
import { TranslationDetail } from "src/app/models/translation-detail.model";

//Env
import { environment } from "src/environments/environment";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private apiURL: string = environment.apiURL + 'translations/';
  private resultRAW: any;

  constructor(private httpClient: HttpClient,
    private authUtils: AuthUtils,
  ) { }

  getByProject(project_id: number): Observable<Response> {

    let apiURL = this.apiURL + 'models/projects/' + project_id;
    let response = new Response();

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result?.map(responseTranslation => {

        let translation = new Translation();
        translation.id = responseTranslation.id;
        translation.key = responseTranslation.key;
        translation.model_id = responseTranslation.model_id;

        translation.details = responseTranslation?.details?.map(responseTranslationDetail => {

          let detail = new TranslationDetail();
          detail.id = responseTranslationDetail.id;
          detail.value = responseTranslationDetail.value;
          detail.locale = responseTranslationDetail.locale;
          detail.translation_id = responseTranslationDetail.translation_id;

          return detail;
        });

        return translation;
      });

      return response;
    }));
  }

  getByModel(project_id: number): Observable<Response> {

    let apiURL = this.apiURL + 'models/' + project_id;
    let response = new Response();

    return this.httpClient.get(apiURL, this.authUtils.getHeaders()).pipe(map(res => {

      this.resultRAW = res;
      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      response.result = this.resultRAW.result?.map(responseTranslation => {

        let translation = new Translation();
        translation.id = responseTranslation.id;
        translation.key = responseTranslation.key;
        translation.model_id = responseTranslation.model_id;

        translation.details = responseTranslation?.details?.map(responseTranslationDetail => {

          let detail = new TranslationDetail();
          detail.id = responseTranslationDetail.id;
          detail.value = responseTranslationDetail.value;
          detail.locale = responseTranslationDetail.locale;
          detail.translation_id = responseTranslationDetail.translation_id;

          return detail;
        });

        return translation;
      });

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
}
