import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedResponse } from 'src/app/shared/shared.interfaces';
import { Login } from '../interfaces/login';
import { New_Password } from '../interfaces/new-password';
import { Reset_Password } from '../interfaces/reset-password';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  constructor(private http: HttpClient) { }

  iniciarSesion(login: Login): Observable<SharedResponse>{
    return this.http.post<SharedResponse>("http://localhost:5213/api/Usuario/IniciarSesion", login);
  }

  nuevaClave(newPassword: New_Password): Observable<SharedResponse>{
    return this.http.put<SharedResponse>("http://localhost:5213/api/Acceso/CambiarClave", newPassword);
  }

  resetearClave(resetPassword: Reset_Password): Observable<SharedResponse>{
    return this.http.put<SharedResponse>("http://localhost:5213/api/Acceso/ReestablecerClave", resetPassword);
  }
  
}
