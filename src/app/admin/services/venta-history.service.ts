import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedResponse } from 'src/app/shared/shared.interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaHistoryService {

  constructor(private http: HttpClient) { }

  historial(fechaInicio: string, fechaFin: string, idTransaccion: string): Observable<SharedResponse>{
    return this.http.get<SharedResponse>(`http://localhost:5213/api/Venta/Historial?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&idTransaccion=${idTransaccion}`);
  }

  ubicacion(idDistrito: string): Observable<SharedResponse>{
    return this.http.get<SharedResponse>(`http://localhost:5213/api/Venta/Ubicacion/${idDistrito}`)
  }
  
}
