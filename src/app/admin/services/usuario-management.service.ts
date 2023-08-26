import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedResponse } from 'src/app/shared/shared.interfaces';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario-management';

@Injectable({
  providedIn: 'root'
})
export class UsuarioManagementService {

  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<SharedResponse>{
    return this.http.get<SharedResponse>("http://localhost:5213/api/Usuario/lista");
  }

  obtenerUsuarioById(idUsuario: number): Observable<SharedResponse>{
    return this.http.get<SharedResponse>(`http://localhost:5213/api/Usuario/${idUsuario}`);
  }

  registrar(usuario: FormData): Observable<SharedResponse>{
    return this.http.post<SharedResponse>("http://localhost:5213/api/Usuario/Guardar", usuario);
  }

  editar(usuario: FormData): Observable<SharedResponse>{
    return this.http.put<SharedResponse>("http://localhost:5213/api/Usuario/Editar", usuario);
  }

  eliminar(usuario: Usuario): Observable<SharedResponse>{
    return this.http.delete<SharedResponse>(`http://localhost:5213/api/Usuario/Eliminar/${usuario.idUsuario}`);
  }
}
