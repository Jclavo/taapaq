import { Component, OnInit } from '@angular/core';

//Models
import { Response } from "src/app/models/response.model";
import { Company } from "src/app/models/company.model";

//Services
import { CompanyService } from "src/app/services/company.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";
import { Utils } from "src/app/utils/utils";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.page.html',
  styleUrls: ['./company-list.page.scss'],
})
export class CompanyListPage implements OnInit {

  public companies: Array<Company> = [];
  public companiesBackup: Array<Company> = [];
  public searchValue: string = '';

  constructor(
    private companyService: CompanyService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.getAll();
  }

  search(){
    if(!this.searchValue){
      this.companies = []; 
      this.companies = Utils.copyDeeperObject(this.companiesBackup);
      return;
    }
    this.companies.length == 0 ? this.companies = Utils.copyDeeperObject(this.companiesBackup) : null;

    this.companies = Utils.findValueInCollection(this.companies,this.searchValue);
  }

  async getAll() {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.companyService.getAll().subscribe((response: Response) => {
      if (response.status) {
        this.companies = response.result;
        this.companiesBackup = Utils.copyDeeperObject(this.companies);
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

  async delete(id: number, role: string){

    if(!await this.messageUtils.showAlertOption('You are sure to delete the company: ', role)){
      return;
    }

    this.companyService.delete(id).subscribe((response: Response) => {
      if (response.status) {
        this.getAll();
      }
      else {
        this.messageUtils.showToastError(response.message);
      }
    },
      error => {
        this.messageUtils.showToastError(error.message);
      }
    );

  }

}
