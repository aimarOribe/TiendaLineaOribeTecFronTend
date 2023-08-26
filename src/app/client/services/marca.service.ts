import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedResponse } from 'src/app/shared/shared.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: HttpClient) { }

  listarMarcasPorCategoria(idCategoria: number): Observable<SharedResponse>{
    return this.http.get<SharedResponse>(`http://localhost:5213/api/Marca/ListarMarcasPorCategoria/${idCategoria}`)
  }
}
