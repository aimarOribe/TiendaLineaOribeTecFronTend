import { Component } from '@angular/core';
import { UsuarioInformacionService } from '../../services/usuario-informacion.service';
import { Router } from '@angular/router';
import { Sesion } from '../../interfaces/sesion';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  usuario: Sesion = {
    idUsuario: 0,
    nombres: "",
    apellidos: "",
    correo: "",
    rolDescripcion: "",
    reestablecer: 0,
    rutaImagen: ""
  };

  estaAutenticado: boolean = false;

  constructor(private usuarioInformacionService: UsuarioInformacionService,
    private router: Router){
      if(this.usuarioInformacionService.isAuthenticated()){
        this.usuario = this.usuarioInformacionService.getSesion();
        this.estaAutenticado = this.usuarioInformacionService.isAuthenticated();
      }
    }

  cerrarSesion(){
    this.usuarioInformacionService.cerrarSesion();
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
    //this.router.navigate(['']);
  }

}
