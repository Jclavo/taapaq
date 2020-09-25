import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslationListPage } from './translation-list.page';

const routes: Routes = [
  {
    path: '',
    component: TranslationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslationListPageRoutingModule {}
