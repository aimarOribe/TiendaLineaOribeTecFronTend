import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { ClientRoutingModule } from './client-routing.module';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { NewPasswordClientComponent } from './components/new-password-client/new-password-client.component';
import { ResetPasswordClientComponent } from './components/reset-password-client/reset-password-client.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { HistorialComponent } from './pages/historial/historial.component';


@NgModule({
  declarations: [
    ClientLayoutComponent,
    FooterComponent,
    HeaderComponent,
    NewPasswordClientComponent,
    ResetPasswordClientComponent,
    HomeComponent,
    CartComponent,
    ProductDetailComponent,
    HistorialComponent
  ],
  imports: [
    ClientRoutingModule,
    SharedModule,
    NgxPayPalModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientModule { }
