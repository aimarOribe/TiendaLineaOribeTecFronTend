import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CategoriaManagementComponent } from './pages/categoria-management/categoria-management.component';
import { UsuarioManagementComponent } from './pages/usuario-management/usuario-management.component';
import { MarcaManagementComponent } from './pages/marca-management/marca-management.component';
import { ProductoManagementComponent } from './pages/producto-management/producto-management.component';
import { VentaHistoryComponent } from './pages/venta-history/venta-history.component';
import { ChatComponent } from './pages/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: AdminDashboardComponent
      },
      {
        path: 'categoria',
        component: CategoriaManagementComponent
      },
      {
        path: 'marca',
        component: MarcaManagementComponent
      },
      {
        path: 'producto',
        component: ProductoManagementComponent
      },
      {
        path: 'historial-venta',
        component: VentaHistoryComponent
      },
      {
        path: 'usuario',
        component: UsuarioManagementComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
