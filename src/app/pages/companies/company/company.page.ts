import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { Company } from "src/app/models/company.model";
import { UserDetail } from "src/app/models/user-detail";
import { SearchOptionUser } from "src/app/models/search-option-user.model";
import { PersonType } from "src/app/models/person-type.model";

//Services
import { CompanyService } from "src/app/services/company.service";
import { UserDetailService } from "src/app/services/user-detail.service";

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
  public persons: Array<UserDetail> = [];

  constructor(
    private companyService: CompanyService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils,
    private router: Router,
    private userDetailService: UserDetailService
  ) { }
 
  ngOnInit() {
  }

  ionViewDidEnter(){
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.getAllPersons();
  }

  save(){

    if(this.company.id > 0){
      //update
    }else{
      this.create(this.company);
    }
  }

  async getAllPersons() {

    let searchOptionUser = new SearchOptionUser();
    searchOptionUser.type_id = PersonType.getForJuridical();

    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.userDetailService.getAll(searchOptionUser).subscribe((response: Response) => {
      if (response.status) {
        this.persons = response.result;
      }
      else {
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
