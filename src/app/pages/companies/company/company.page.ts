import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { Company } from "src/app/models/company.model";

//Services
import { CompanyService } from "src/app/services/company.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss'],
})
export class CompanyPage implements OnInit {

  public company = new Company();

  constructor(
    private companyService: CompanyService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils,
    private router: Router
  ) { }
 
  ngOnInit() {
  }

  ionViewDidEnter(){
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session
  }

  save(){

    if(this.company.id > 0){
      //update
    }else{
      this.create(this.company);
    }
  }

  async create(company: Company){
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading
    
    this.companyService.create(company).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.company = new Company(); // clean model
        this.router.navigate(['/company-list']);
      }else{
        this.messageUtils.showToastError(response.message);
      }
      loading.dismiss();// close loading
    },
      error => { 
        this.messageUtils.showToastError(error.message);
        loading.dismiss();// close loading
      }
    );
  }

}
