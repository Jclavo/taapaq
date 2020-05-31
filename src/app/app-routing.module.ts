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
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./pages/user/user-list/user-list.module').then( m => m.UserListPageModule)
  },
  {
    path: 'role-list',
    loadChildren: () => import('./pages/roles/role-list/role-list.module').then( m => m.RoleListPageModule)
  },
  {
    path: 'role-permission/:id',
    loadChildren: () => import('./pages/roles/role-permission/role-permission.module').then( m => m.RolePermissionPageModule)
  },
  {
    path: 'role',
    loadChildren: () => import('./pages/roles/role/role.module').then( m => m.RolePageModule)
  },
  {
    path: 'permission-list',
    loadChildren: () => import('./pages/permissions/permission-list/permission-list.module').then( m => m.PermissionListPageModule)
  },
  {
    path: 'permission',
    loadChildren: () => import('./pages/permissions/permission/permission.module').then( m => m.PermissionPageModule)
  },
  {
    path: 'project-list',
    loadChildren: () => import('./pages/projects/project-list/project-list.module').then( m => m.ProjectListPageModule)
  },
  {
    path: 'project',
    loadChildren: () => import('./pages/projects/project/project.module').then( m => m.ProjectPageModule)
  },
  {
    path: 'module-list',
    loadChildren: () => import('./pages/modules/module-list/module-list.module').then( m => m.ModuleListPageModule)
  },
  {
    path: 'module-list/:project_id',
    loadChildren: () => import('./pages/modules/module-list/module-list.module').then( m => m.ModuleListPageModule)
  },
  {
    path: 'module/:project_id',
    loadChildren: () => import('./pages/modules/module/module.module').then( m => m.ModulePageModule)
  },
  {
    path: 'resource/:project_id/:module_id',
    loadChildren: () => import('./pages/resources/resource/resource.module').then( m => m.ResourcePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
