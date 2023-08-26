import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './admin/components/login/login.component';
import { NewPasswordComponent } from './admin/components/new-password/new-password.component';
import { ResetPasswordComponent } from './admin/components/reset-password/reset-password.component';
import { LoginClientComponent } from './client/components/login-client/login-client.component';
import { RegisterClientComponent } from './client/components/register-client/register-client.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewPasswordComponent,
    ResetPasswordComponent,
    LoginClientComponent,
    RegisterClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
