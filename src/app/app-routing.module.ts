import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  // {
  //   path: 'user',
  //   loadChildren: () => import('./pages/user/users/users.module').then( m => m.UsersPageModule)
  // },
  // {
  //   path: 'user-list',
  //   loadChildren: () => import('./pages/user/user-list/user-list.module').then( m => m.UserListPageModule)
  // },
  {
    path: 'role-list',
    loadChildren: () => import('./pages/roles/role-list/role-list.module').then(m => m.RoleListPageModule)
  },
  {
    path: 'role-list/:project_id',
    loadChildren: () => import('./pages/roles/role-list/role-list.module').then(m => m.RoleListPageModule)
  },
  {
    path: 'role-permission/:id',
    loadChildren: () => import('./pages/roles/role-permission/role-permission.module').then(m => m.RolePermissionPageModule)
  },
  {
    path: 'role/:project_id',
    loadChildren: () => import('./pages/roles/role/role.module').then(m => m.RolePageModule)
  },
  {
    path: 'project-list',
    loadChildren: () => import('./pages/projects/project-list/project-list.module').then(m => m.ProjectListPageModule)
  },
  {
    path: 'project',
    loadChildren: () => import('./pages/projects/project/project.module').then(m => m.ProjectPageModule)
  },
  {
    path: 'module-list',
    loadChildren: () => import('./pages/modules/module-list/module-list.module').then(m => m.ModuleListPageModule)
  },
  {
    path: 'module-list/:project_id',
    loadChildren: () => import('./pages/modules/module-list/module-list.module').then(m => m.ModuleListPageModule)
  },
  {
    path: 'module/:project_id',
    loadChildren: () => import('./pages/modules/module/module.module').then(m => m.ModulePageModule)
  },
  {
    path: 'resource/:project_id/:module_id',
    loadChildren: () => import('./pages/resources/resource/resource.module').then(m => m.ResourcePageModule)
  },
  {
    path: 'company-list',
    loadChildren: () => import('./pages/companies/company-list/company-list.module').then(m => m.CompanyListPageModule)
  },
  {
    path: 'company',
    loadChildren: () => import('./pages/companies/company/company.module').then(m => m.CompanyPageModule)
  },
  {
    path: 'project-company',
    loadChildren: () => import('./pages/projects/project-company/project-company.module').then(m => m.ProjectCompanyPageModule)
  },
  {
    path: 'project-company/:project_id',
    loadChildren: () => import('./pages/projects/project-company/project-company.module').then(m => m.ProjectCompanyPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./pages/users/user-list/user-list.module').then(m => m.UserListPageModule)
  },
  {
    path: 'user-list/:project_id/:company_id',
    loadChildren: () => import('./pages/users/user-list/user-list.module').then(m => m.UserListPageModule)
  },
  {
    path: 'user/:project_id/:company_id',
    loadChildren: () => import('./pages/users/user/user.module').then(m => m.UserPageModule)
  },
  {
    path: 'user-detail',
    loadChildren: () => import('./pages/users/user-detail/user-detail.module').then(m => m.UserDetailPageModule)
  },
  {
    path: 'user-detail-list',
    loadChildren: () => import('./pages/users/user-detail-list/user-detail-list.module').then(m => m.UserDetailListPageModule)
  },
  {
    path: 'module-label/:project_id',
    loadChildren: () => import('./pages/modules/module-label/module-label.module').then(m => m.ModuleLabelPageModule)
  },
  {
    path: 'model-list',
    loadChildren: () => import('./pages/models/model-list/model-list.module').then( m => m.ModelListPageModule)
  },
  {
    path: 'model-list/:project_id',
    loadChildren: () => import('./pages/models/model-list/model-list.module').then( m => m.ModelListPageModule)
  },
  {
    path: 'model/:project_id',
    loadChildren: () => import('./pages/models/model/model.module').then( m => m.ModelPageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
  {
    path: 'translation-list',
    loadChildren: () => import('./pages/translations/translation-list/translation-list.module').then( m => m.TranslationListPageModule)
  },
  {
    path: 'translation-list/:project_id',
    loadChildren: () => import('./pages/translations/translation-list/translation-list.module').then( m => m.TranslationListPageModule)
  },
  {
    path: 'translation-list/:project_id/:model_id',
    loadChildren: () => import('./pages/translations/translation-list/translation-list.module').then( m => m.TranslationListPageModule)
  },
  {
    path: 'translation/:project_id',
    loadChildren: () => import('./pages/translations/translation/translation.module').then( m => m.TranslationPageModule)
  },
  {
    path: 'translation/:project_id/:model_id',
    loadChildren: () => import('./pages/translations/translation/translation.module').then( m => m.TranslationPageModule)
  },
  {
    path: 'translation-detail/:project_id/:model_id/:translation_id',
    loadChildren: () => import('./pages/translations/translation-detail/translation-detail.module').then( m => m.TranslationDetailPageModule)
  },
  // {
  //   path: '**',
  //   redirectTo: 'not-found',
  //   pathMatch: 'full'
  // },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
