import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedResponse } from 'src/app/shared/shared.interfaces';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria-management';

@Injectable({
  providedIn: 'root'
})
export class CategoriaManagementService {

  constructor(private http: HttpClient) { }

  listar(): Observable<SharedResponse>{
    return this.http.get<SharedResponse>("http://localhost:5213/api/Categoria/lista");
  }

  registrar(categoria: Categoria): Observable<SharedResponse>{
    return this.http.post<SharedResponse>("http://localhost:5213/api/Categoria/Guardar", categoria);
  }

  editar(categoria: Categoria): Observable<SharedResponse>{
    return this.http.put<SharedResponse>("http://localhost:5213/api/Categoria/Editar", categoria);
  }

  eliminar(categoria: Categoria): Observable<SharedResponse>{
    return this.http.delete<SharedResponse>(`http://localhost:5213/api/Categoria/Eliminar/${categoria.idCategoria}`);
  }
}
