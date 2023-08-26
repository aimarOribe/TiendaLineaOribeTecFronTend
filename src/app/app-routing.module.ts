import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/components/login/login.component';
import { NewPasswordComponent } from './admin/components/new-password/new-password.component';
import { ResetPasswordComponent } from './admin/components/reset-password/reset-password.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./client/client.module").then((m) => m.ClientModule)
  },
  {
    path: 'admin/login',
    component: LoginComponent
  },
  {
    path: 'admin/new-password',
    component: NewPasswordComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'admin',
    loadChildren: () => import("./admin/admin.module").then((m) => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: '**',
    loadChildren: () => import("./client/client.module").then((m) => m.ClientModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
