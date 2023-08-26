import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedResponse } from 'src/app/shared/shared.interfaces';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto-management';

@Injectable({
  providedIn: 'root'
})
export class ProductoManagementService {

  constructor(private http: HttpClient) { }

  listar(): Observable<SharedResponse>{
    return this.http.get<SharedResponse>("http://localhost:5213/api/Producto/lista");
  }

  registrar(producto: FormData): Observable<SharedResponse>{
    return this.http.post<SharedResponse>("http://localhost:5213/api/Producto/Guardar", producto);
  }

  editar(producto: FormData): Observable<SharedResponse>{
    return this.http.put<SharedResponse>("http://localhost:5213/api/Producto/Editar", producto);
  }

  eliminar(producto: Producto): Observable<SharedResponse>{
    return this.http.delete<SharedResponse>(`http://localhost:5213/api/Producto/Eliminar/${producto.idProducto}`);
  }

}
