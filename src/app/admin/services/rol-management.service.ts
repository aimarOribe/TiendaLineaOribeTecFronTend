import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedResponse } from 'src/app/shared/shared.interfaces';
import { Observable } from 'rxjs';
import { Rol } from '../interfaces/rol-management';

@Injectable({
  providedIn: 'root'
})
export class RolManagementService {

  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<SharedResponse>{
    return this.http.get<SharedResponse>("http://localhost:5213/api/Rol/lista");
  }

}
