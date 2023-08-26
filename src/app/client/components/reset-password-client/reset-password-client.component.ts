import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionesService } from 'src/app/shared/services/notificaciones.service';
import { AccesoClientService } from '../../services/acceso-client.service';
import { Router } from '@angular/router';
import { Reset_Password_Client } from '../../interfaces/reset-password-client';

@Component({
  selector: 'app-reset-password-client',
  templateUrl: './reset-password-client.component.html',
  styleUrls: ['./reset-password-client.component.css']
})
export class ResetPasswordClientComponent {

  formulario: FormGroup;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificacionesService: NotificacionesService,
    private accesoClientService: AccesoClientService) {
      this.formulario = this.fb.group({
        correo: ["", [Validators.required, Validators.email]],
      })
    }

  resetearClave(){
    this.cargando = true;

    const _resetPasswordClient: Reset_Password_Client  = {
      correo: this.formulario.value.correo
    }

    this.accesoClientService.resetearClave(_resetPasswordClient).subscribe({
      next: (response) => {
        if(response.status){
          this.cargando = false;
          this.notificacionesService.notificacionSuccess("Clave reestablecida correctamente, revise su correo");
          this.router.navigate(['/login']);
        }          
      },
      error: (error) => {
        this.cargando = false;
        this.notificacionesService.notifiWarning(error.error.msg);
      }
    })
  }

}
