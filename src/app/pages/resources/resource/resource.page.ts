import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Models
import { Response } from "src/app/models/response.model";
import { Resource } from "src/app/models/resource.model";


//Services
import { ResourceService } from "src/app/services/resource.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-resource',
  templateUrl: './resource.page.html',
  styleUrls: ['./resource.page.scss'],
})
export class ResourcePage implements OnInit {

  public resource = new Resource();
  public project_id: number = 0;

  constructor(
    private authUtils: AuthUtils,
    private messageUtils: MessageUtils,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private resourceService: ResourceService,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null; //It should be at any page to control session
  
    this.project_id = Number(this.activatedRoute.snapshot.paramMap.get('project_id'));
    this.resource.module_id = Number(this.activatedRoute.snapshot.paramMap.get('module_id'));
  }

  save() {

    if (this.resource.id > 0) {
      //update
    } else {
      this.create(this.resource);
    }
  }

  async create(resource: Resource) {
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.resourceService.create(resource).subscribe((response: Response) => {
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.resource = new Resource(); // clean model
        this.router.navigate(['/module-list', this.project_id]);
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
