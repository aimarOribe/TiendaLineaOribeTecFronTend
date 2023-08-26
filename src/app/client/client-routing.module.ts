import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { LoginClientComponent } from './components/login-client/login-client.component';
import { RegisterClientComponent } from './components/register-client/register-client.component';
import { NewPasswordClientComponent } from './components/new-password-client/new-password-client.component';
import { ResetPasswordClientComponent } from './components/reset-password-client/reset-password-client.component';
import { ClientGuard } from '../client.guard';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginClientComponent
      },
      {
        path: 'register',
        component: RegisterClientComponent
      },
      {
        path: 'new-password',
        component: NewPasswordClientComponent,
        canActivate: [ClientGuard]
      },
      {
        path: 'reset-password',
        component: ResetPasswordClientComponent
      },
      {
        path: 'history',
        component: HistorialComponent
      },
      {
        path: 'product-detail',
        component: ProductDetailComponent
      },
      {
        path: 'cart',
        component: CartComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
