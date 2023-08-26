import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedResponse } from 'src/app/shared/shared.interfaces';
import { Observable } from 'rxjs';
import { LoginClient } from '../interfaces/login-client';
import { New_Password_Client } from '../interfaces/new-password-client';
import { Reset_Password_Client } from '../interfaces/reset-password-client';

@Injectable({
  providedIn: 'root'
})
export class AccesoClientService {

  constructor(private http: HttpClient) { }

  iniciarSesion(login: LoginClient): Observable<SharedResponse>{
    return this.http.post<SharedResponse>("http://localhost:5213/api/Cliente/IniciarSesion", login);
  }

  nuevaClave(newPassword: New_Password_Client): Observable<SharedResponse>{
    return this.http.put<SharedResponse>("http://localhost:5213/api/Cliente/CambiarClave", newPassword);
  }

  resetearClave(resetPassword: Reset_Password_Client): Observable<SharedResponse>{
    return this.http.put<SharedResponse>("http://localhost:5213/api/Cliente/ReestablecerClave", resetPassword);
  }

}
