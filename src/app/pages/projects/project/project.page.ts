import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { Project } from "src/app/models/project.model";

//Services
import { ProjectService } from "src/app/services/project.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {

  public project = new Project();

  constructor(
    private projectService: ProjectService,
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session
  }

  save() {

    if (this.project.id > 0) {
      //update
    } else {
      this.create(this.project);
    }
  }

  async create(project: Project) {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.projectService.create(project).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.project = new Project(); // clean model
        this.router.navigate(['/project-list']);
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
