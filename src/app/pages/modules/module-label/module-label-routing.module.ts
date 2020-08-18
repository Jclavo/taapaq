import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuleLabelPage } from './module-label.page';

const routes: Routes = [
  {
    path: '',
    component: ModuleLabelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleLabelPageRoutingModule {}
