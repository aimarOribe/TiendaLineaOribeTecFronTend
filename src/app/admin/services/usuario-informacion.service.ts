import { Injectable } from '@angular/core';
import { Sesion } from '../interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class UsuarioInformacionService {

  constructor() { }

  setSesion(sesion: Sesion){
    localStorage.setItem("sesion",  JSON.stringify(sesion));
  }

  getSesion() : Sesion{
    return JSON.parse(localStorage.getItem("sesion")!);
  }

  getUserId(){
    var usuario: Sesion = this.getSesion();
    return usuario.idUsuario;
  }

  cerrarSesion(){
    localStorage.removeItem("sesion");
  }

  isAuthenticated(){
    var usuario = this.getSesion();
    if(usuario == null){
      return false
    }
    return true;
  }
}
