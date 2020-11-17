import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { UserDetail } from "src/app/models/user-detail";
import { Country } from "src/app/models/country.model";
import { PersonType } from "src/app/models/person-type.model";

//Services
import { UserDetailService } from "src/app/services/user-detail.service";
import { CountryService } from "src/app/services/country.service";
import { PersonTypeService } from "src/app/services/person-type.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  public user = new UserDetail();
  public countries: Array<Country> = [];
  public personTypes: Array<PersonType> = [];
  
  constructor(
    private userDetailService: UserDetailService,
    private authUtils: AuthUtils,
    private activatedRoute: ActivatedRoute,
    private messageUtils: MessageUtils,
    private router: Router,
    private countryService: CountryService,
    private personTypeService: PersonTypeService
  ) { } 

  ngOnInit() {
  }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session
    
    this.getCountries();
    this.getPersonTypes();
  }

  async getCountries() {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.countryService.getAll().subscribe((response: Response) => {
      if (response.status) {
        this.countries = response.result;
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

  async getPersonTypes() {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.personTypeService.getAll().subscribe((response: Response) => {
      if (response.status) {
        this.personTypes = response.result;
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

  save() {

    if (this.user.id > 0) {
      //update
    } else {
      this.create(this.user);
    }
  }

  async create(user: UserDetail) {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.userDetailService.create(user).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.router.navigate(['/user-detail-list']);

      } else {
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
