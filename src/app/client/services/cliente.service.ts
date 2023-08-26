import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedResponse } from 'src/app/shared/shared.interfaces';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  obtenerClientes(): Observable<SharedResponse>{
    return this.http.get<SharedResponse>("http://localhost:5213/api/Cliente/lista");
  }

  registrar(cliente: Cliente): Observable<SharedResponse>{
    return this.http.post<SharedResponse>("http://localhost:5213/api/Cliente/Guardar", cliente);
  }

  editar(cliente: Cliente): Observable<SharedResponse>{
    return this.http.put<SharedResponse>("http://localhost:5213/api/Cliente/Editar", cliente);
  }

  eliminar(cliente: Cliente): Observable<SharedResponse>{
    return this.http.delete<SharedResponse>(`http://localhost:5213/api/Cliente/Eliminar/${cliente.idCliente}`);
  }

}
