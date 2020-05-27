import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { ToastController } from '@ionic/angular';
import { User } from "src/app/models/user.model";
import { Response } from "src/app/models/response.model";


import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL: string = environment.apiURL;
  private resultRAW: any;
  // private resultObservable: Observable<User[]>;

  constructor(private httpClient: HttpClient) { }

  login(user: User): Observable<Response> {

    let apiURL = environment.apiURL + 'login';
    let response = new Response();

    return this.httpClient.post(apiURL,user).pipe(map(res => {

      this.resultRAW = res;

      response.status = this.resultRAW.status;
      response.message = this.resultRAW.message;

      if(this.resultRAW.data){
        let user = new User();
        user.id = this.resultRAW.data.id;
        user.name = this.resultRAW.data.name;
        user.email = this.resultRAW.data.email;
      }

      return response;

    }));

  }
}
