import { NgModule } from '@angular/core';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CategoriaManagementComponent } from './pages/categoria-management/categoria-management.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { UsuarioManagementComponent } from './pages/usuario-management/usuario-management.component';
import { SharedModule } from '../shared/shared.module';
import { MarcaManagementComponent } from './pages/marca-management/marca-management.component';
import { ProductoManagementComponent } from './pages/producto-management/producto-management.component';
import { VentaHistoryComponent } from './pages/venta-history/venta-history.component';
import { ChatComponent } from './pages/chat/chat.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    CategoriaManagementComponent,
    AdminLayoutComponent,
    HeaderComponent,
    FooterComponent,
    UsuarioManagementComponent,
    MarcaManagementComponent,
    ProductoManagementComponent,
    VentaHistoryComponent,
    ChatComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
