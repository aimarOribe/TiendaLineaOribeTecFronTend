import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StyleScriptService } from 'src/app/shared/services/style-script.service';
import { LoginClient } from '../../interfaces/login-client';
import { AccesoClientService } from '../../services/acceso-client.service';
import { Router } from '@angular/router';
import { NotificacionesService } from 'src/app/shared/services/notificaciones.service';
import { ClienteInformacionService } from '../../services/cliente-informacion.service';


@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private styleScriptService: StyleScriptService,
    private router: Router,
    private notificacionesService: NotificacionesService,
    private accesoClientService: AccesoClientService,
    private clienteInformacionService: ClienteInformacionService) {
      if(this.clienteInformacionService.isAuthenticated()){
        this.router.navigate(['/']);
      }

      this.formulario = this.fb.group({
        correo: ["", [Validators.required, Validators.email]],
        clave: ["", Validators.required]
      })
    }
  
  ngOnInit(): void {

    const stylePromise = new Promise<void>((resolve, reject) => {
      resolve();
    });

    const scriptPromise = new Promise<void>((resolve, reject) => {
      this.styleScriptService.addScriptCitySpecific('../../../../assets/client/login-custom.js', 12)
      .then(() => {
        resolve();
      })
    })

    Promise.all([stylePromise, scriptPromise])
      .then(() => {
      })
      .catch(error => {
        console.error('Error cargando recursos:', error);
      });
  }

  inicarSesion(){
    this.cargando = true;

    const _loginClient: LoginClient  = {
      correo: this.formulario.value.correo,
      clave: this.formulario.value.clave
    }

    this.accesoClientService.iniciarSesion(_loginClient).subscribe({
      next: (response) => {
        if(response.status){
          this.cargando = false;
          this.clienteInformacionService.setSesion(response.data);
          if(response.data.reestablecer){
            this.router.navigate(['/new-password']);
          }else{
            this.router.navigate(['/']);
            this.notificacionesService.notificacionSuccess("Sesión Iniciada Correctamente");
          }       
        }
      },
      error: (error) => {
        this.cargando = false;
        console.log(error);
        this.notificacionesService.notifiWarning(error.error.msg);
      }
    })
  }

  regresarTienda(){
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.styleScriptService.removeScripts(12);
  }

}
