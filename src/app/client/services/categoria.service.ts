import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedResponse } from 'src/app/shared/shared.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  listarActivos(): Observable<SharedResponse>{
    return this.http.get<SharedResponse>("http://localhost:5213/api/Categoria/ListaActivo");
  }

}
