import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedResponse } from 'src/app/shared/shared.interfaces';
import { Observable } from 'rxjs';
import { Marca } from '../interfaces/marca-management';

@Injectable({
  providedIn: 'root'
})
export class MarcaManagementService {

  constructor(private http: HttpClient) { }

  listar(): Observable<SharedResponse>{
    return this.http.get<SharedResponse>("http://localhost:5213/api/Marca/lista");
  }

  registrar(marca: Marca): Observable<SharedResponse>{
    return this.http.post<SharedResponse>("http://localhost:5213/api/Marca/Guardar", marca);
  }

  editar(marca: Marca): Observable<SharedResponse>{
    return this.http.put<SharedResponse>("http://localhost:5213/api/Marca/Editar", marca);
  }

  eliminar(marca: Marca): Observable<SharedResponse>{
    return this.http.delete<SharedResponse>(`http://localhost:5213/api/Marca/Eliminar/${marca.idMarca}`);
  }
}
