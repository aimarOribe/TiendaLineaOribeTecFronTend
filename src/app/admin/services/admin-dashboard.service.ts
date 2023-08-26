import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedResponse } from 'src/app/shared/shared.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  constructor(private http: HttpClient) { }

  Resumen(): Observable<SharedResponse>{
    return this.http.get<SharedResponse>("http://localhost:5213/api/Dashboard/Resumen");
  }

}
