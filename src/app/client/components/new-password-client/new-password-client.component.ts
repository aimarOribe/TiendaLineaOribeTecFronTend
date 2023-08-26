import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificacionesService } from 'src/app/shared/services/notificaciones.service';
import { AccesoClientService } from '../../services/acceso-client.service';
import { ClienteInformacionService } from '../../services/cliente-informacion.service';
import { Router } from '@angular/router';
import { New_Password_Client } from '../../interfaces/new-password-client';

@Component({
  selector: 'app-new-password-client',
  templateUrl: './new-password-client.component.html',
  styleUrls: ['./new-password-client.component.css']
})
export class NewPasswordClientComponent {

  formulario: FormGroup;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificacionesService: NotificacionesService,
    private accesoClientService: AccesoClientService,
    private clienteInformacionService: ClienteInformacionService) {
      this.formulario = this.fb.group({
        claveAntigua: ["", Validators.required],
        claveNueva: ["", Validators.required],
        confirmarClaveNueva: ["", Validators.required]
      })
    }

  nuevaClave(){
    this.cargando = true;

    var claveAntigua = this.formulario.value.claveAntigua;
    var claveNueva = this.formulario.value.claveNueva;
    var confirmarClaveNueva = this.formulario.value.confirmarClaveNueva;

    if(claveNueva !== confirmarClaveNueva){
      this.cargando = false;
      this.notificacionesService.notifiWarning("Las contraseñas nuevas no son iguales");
    }else{
      const _newPasswordClient: New_Password_Client  = {
        idCliente: this.clienteInformacionService.getUserId(),
        claveAntigua: claveAntigua,
        claveNueva: claveNueva
      }
      this.accesoClientService.nuevaClave(_newPasswordClient).subscribe({
        next: (response) => {
          if(response.status){
            this.cargando = false;
            this.notificacionesService.notificacionSuccess("Clave Configurada Correctamente");
            this.router.navigate(["/"]);
          }          
        },
        error: (error) => {
          console.log("false");
          this.notificacionesService.notificacionWarning(error.error.msg);
          this.cargando = false;
        }
      })
    }
  }
}
