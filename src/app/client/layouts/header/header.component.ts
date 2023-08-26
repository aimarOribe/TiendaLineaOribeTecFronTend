import { Component } from '@angular/core';
import { Sesion_Client } from '../../interfaces/sesion-client';
import { ClienteInformacionService } from '../../services/cliente-informacion.service';
import { CarritoService } from '../../services/carrito.service';
import { ProductoCarrito } from '../../interfaces/producto-client';
import { NotificacionesService } from 'src/app/shared/services/notificaciones.service';
//import { Router } from '@angular/router';
import { RutasService } from '../../services/rutas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  cart: ProductoCarrito[] = [];
  logueado: boolean = false;
  cliente?: Sesion_Client;

  quantity$ = this.carritoService.quantitylAction$;
  total$ = this.carritoService.totalAction$;
  cart$ = this.carritoService.cartAction$;

  constructor(
    private clienteInformacionService: ClienteInformacionService,
    private carritoService: CarritoService,
    private notificacionServicio: NotificacionesService,
    //private router: Router,
    private rutasService: RutasService) {
      if(clienteInformacionService.isAuthenticated()){
        this.cliente = this.clienteInformacionService.getSesion();
        this.logueado = true;
      }
    }

  iniciarSesion(){
    this.rutasService.irLogin();
    //this.router.navigate(['/login']);
  }

  cerrarSesion(){
    this.logueado = false;
    this.clienteInformacionService.cerrarSesion();
    this.rutasService.irHome();
    //this.router.navigate(['/']);
    this.notificacionServicio.notificacionSuccess("Sesión Cerrada Correctamente");
  }

  getDataCart(){
    this.carritoService.cartAction$.subscribe({
      next: (res) => {
        this.cart = res;
      }
    })
  }

}
