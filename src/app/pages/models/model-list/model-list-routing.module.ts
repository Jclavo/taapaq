import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModelListPage } from './model-list.page';

const routes: Routes = [
  {
    path: '',
    component: ModelListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelListPageRoutingModule {}
