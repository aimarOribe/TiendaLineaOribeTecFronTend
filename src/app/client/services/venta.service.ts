import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedResponse } from 'src/app/shared/shared.interfaces';
import { Observable } from 'rxjs';
import { Venta } from '../interfaces/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) { }

  registrar(venta: Venta): Observable<SharedResponse>{
    return this.http.post<SharedResponse>(`http://localhost:5213/api/Venta/Registrar`, venta);
  }

  historialCliente(fechaInicio: string, fechaFin: string, idCliente: number, idTransaccion: string): Observable<SharedResponse>{
    return this.http.get<SharedResponse>(`http://localhost:5213/api/Venta/HistorialCliente?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&idCliente=${idCliente}&idTransaccion=${idTransaccion}`);
  }
  
}
