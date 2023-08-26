import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(private router: Router) { }

  notificacionSuccess(texto: string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: texto
    })
  }

  notificacionWarning(texto: string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'warning',
      title: texto
    })
  }

  notifiSuccess(texto: string){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: texto,
      showConfirmButton: false,
      timer: 1500
    })
  }

  notifiWarning(texto: string){
    Swal.fire('Opps!', texto, 'warning');
  }

  notifiIniciarSesionCancel(){
    Swal.fire({
      title: 'Inicia Sesion para Realizar tu Pedido',
      text: "Forma Parte de nuestra familia para que asi puedas acceder a todas nuestras opciones",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iniciar Sesión'
    }).then((result) => {
      if (result.isConfirmed) {
          this.router.navigate(['/login']);
      }
    })
  }

  notificacionCompraAceptada(idTransaccion: string){
    Swal.fire({
      title: 'Compra Exitosa',
      text: `En un plazo de 1 semana su pedido estará en su puerta, el Id de su pedido es ${idTransaccion}`,
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Hecho',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
          this.router.navigate(['/']);
      }
    })
  }

}
