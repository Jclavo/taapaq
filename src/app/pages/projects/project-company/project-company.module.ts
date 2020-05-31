import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectCompanyPageRoutingModule } from './project-company-routing.module';

import { ProjectCompanyPage } from './project-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectCompanyPageRoutingModule
  ],
  declarations: [ProjectCompanyPage]
})
export class ProjectCompanyPageModule {}
