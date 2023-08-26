import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedResponse } from 'src/app/shared/shared.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionVentaService {

  constructor(private http: HttpClient) { }

  listarDepartamentos(): Observable<SharedResponse>{
    return this.http.get<SharedResponse>(`http://localhost:5213/api/Departamento/lista`);
  }

  listarProvincias(idDepartamento: string): Observable<SharedResponse>{
    return this.http.get<SharedResponse>(`http://localhost:5213/api/Provincia/ListaPorDepartamento/${idDepartamento}`);
  }

  listarDistritos(idProvincia: string, idDepartamento: string): Observable<SharedResponse>{
    return this.http.get<SharedResponse>(`http://localhost:5213/api/Distrito/ListaProvinciaYPorDepartamento/${idProvincia}/${idDepartamento}`);
  }
}
