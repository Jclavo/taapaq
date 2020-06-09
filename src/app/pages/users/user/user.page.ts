import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { User } from "src/app/models/user.model";
import { UserDetail } from "src/app/models/user-detail";
import { Company } from "src/app/models/company.model";
import { Project } from "src/app/models/project.model";

//Services
import { UserDetailService } from "src/app/services/user-detail.service";
import { ProjectService } from "src/app/services/project.service";
import { UserService } from "src/app/services/user.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public projects: Array<Project> = [];
  public companies: Array<Company> = [];
  public user = new User();
  public users: Array<UserDetail> = [];

  constructor(
    private userDetailService: UserDetailService,
    private router: Router,
    private authUtils: AuthUtils,
    private activatedRoute: ActivatedRoute,
    private messageUtils: MessageUtils,
    private projectService: ProjectService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session

    this.user.project_id = Number(this.activatedRoute.snapshot.paramMap.get('project_id'));
    this.user.company_id = Number(this.activatedRoute.snapshot.paramMap.get('company_id'));

    this.getAllProjects();
    this.getCompaniesByProject(this.user.project_id);
    this.getAllUsers();

  }

  onChangeProject() {
    this.getCompaniesByProject(this.user.project_id);
  }

  onChangeCompany() {
    // this.getCompaniesByProject(this.user.project_id);
  }

  onChangeUser() {
    // var foundIndex = this.users.findIndex(function(value){ 
    //   return value.id == this.user.user_detail_id; 
    // });
    this.user.login = '';
    for (let index = 0; index < this.users.length; index++) {
      if (this.users[index].id == this.user.user_detail_id) {
        this.user.info.identification = this.users[index].identification;
      }
    }
  }

  async getAllUsers() {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.userDetailService.getAll().subscribe((response: Response) => {
      if (response.status) {
        this.users = response.result;
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


  async getAllProjects() {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.projectService.getAll().subscribe((response: Response) => {
      if (response.status) {
        this.projects = response.result;
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

  async getCompaniesByProject(project_id: number) {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.projectService.getCompaniesByProject(project_id).subscribe((response: Response) => {
      if (response.status) {
        this.companies = response.result?.companies;
        if (this.companies.length == 0) {
          this.messageUtils.showToastOK("Project does not have companies.");
        }
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

    if (this.user.company_id == undefined || this.user.project_id == undefined) {
      this.messageUtils.showToastError("Select a value.");
      return;
    }

    if (this.user.id > 0) {
      //update
    } else {
      this.create(this.user);
    }

  }

  async create(user: User) {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.userService.create(user).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.router.navigate(['/user-list', this.user.project_id, this.user.company_id]);
        this.user = new User();
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
