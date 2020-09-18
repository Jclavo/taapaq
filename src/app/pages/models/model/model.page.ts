import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Models
import { Model } from "src/app/models/model.model";
import { Response } from "src/app/models/response.model";
import { Project } from "src/app/models/project.model";

//Services
import { ModelService } from "src/app/services/model.service";
import { ProjectService } from "src/app/services/project.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-model',
  templateUrl: './model.page.html',
  styleUrls: ['./model.page.scss'],
})
export class ModelPage implements OnInit {

  public model = new Model();
  public projects: Array<Project> = [];

  constructor(
    private modelService: ModelService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
  ) { }
 
  ngOnInit() {
  }

  ionViewDidEnter(){
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session
    
    this.model.project_id = Number(this.activatedRoute.snapshot.paramMap.get('project_id'));  // assigned project
    this.getAllProjects();
  }

  async getAllProjects() {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.projectService.getAll().subscribe((response: Response) => {
      if (response.status) {
        this.projects = response.result;
      }
      else {
        this.authUtils.user.isSuper ? this.messageUtils.showToastError(response.message) : console.log(response.message);    
      }
      loading.dismiss();// close loading
    },
      error => {
        this.messageUtils.showToastError(error.message);
        loading.dismiss();// close loading
      }
    );
  }

  save(){

    if(this.model.project_id == 0){
      this.messageUtils.showToastError("Select a value.");
      return;
    }

    if(this.model.id > 0){
      //update
    }else{
      this.create(this.model);
    }
  }

  async create(model: Model){
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading
    
    this.modelService.create(model).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.router.navigate(['/model-list',this.model.project_id]);
        this.model = new Model(); // clean model
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
