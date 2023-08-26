import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedResponse } from 'src/app/shared/shared.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  listarProductoActivos(idCategoria: number, idMarca: number): Observable<SharedResponse>{
    return this.http.get<SharedResponse>(`http://localhost:5213/api/Producto/ListarTienda/${idCategoria}/${idMarca}`);
  }

  obtenerPorId(idProducto: number): Observable<SharedResponse>{
    return this.http.get<SharedResponse>(`http://localhost:5213/api/Producto/${idProducto}`);
  }
  
}
