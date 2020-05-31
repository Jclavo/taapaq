import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectCompanyPage } from './project-company.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectCompanyPageRoutingModule {}
