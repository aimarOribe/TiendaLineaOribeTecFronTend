import { Injectable } from '@angular/core';
import { Sesion_Client } from '../interfaces/sesion-client';

@Injectable({
  providedIn: 'root'
})
export class ClienteInformacionService {

  constructor() { }

  setSesion(sesion: Sesion_Client){
    localStorage.setItem("sesionclient",  JSON.stringify(sesion));
  }

  getSesion() : Sesion_Client{
    return JSON.parse(localStorage.getItem("sesionclient")!);
  }

  getUserId(){
    var usuario: Sesion_Client = this.getSesion();
    return usuario.idCliente;
  }

  cerrarSesion(){
    localStorage.removeItem("sesionclient");
  }

  isAuthenticated(){
    var usuario = this.getSesion();
    if(usuario == null){
      return false
    }
    return true;
  }

}
