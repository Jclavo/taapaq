import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDetailListPage } from './user-detail-list.page';

const routes: Routes = [
  {
    path: '',
    component: UserDetailListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDetailListPageRoutingModule {}
