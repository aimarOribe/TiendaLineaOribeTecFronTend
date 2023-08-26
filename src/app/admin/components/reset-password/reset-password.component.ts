import { Component, OnDestroy, OnInit } from '@angular/core';
import { StyleScriptService } from '../../../shared/services/style-script.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificacionesService } from '../../../shared/services/notificaciones.service';
import { AccesoService } from '../../services/acceso.service';
import { UsuarioInformacionService } from '../../services/usuario-informacion.service';
import { Reset_Password } from '../../interfaces/reset-password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private styleScriptService: StyleScriptService,
    private router: Router,
    private notificacionesService: NotificacionesService,
    private accesoService: AccesoService,
    private usuarioInformacionService: UsuarioInformacionService) {
      this.formulario = this.fb.group({
        correo: ["", [Validators.required, Validators.email]],
      })
    }

  ngOnInit(): void {

    const stylePromise = new Promise<void>((resolve, reject) => {
      this.styleScriptService.addStyleCitySpecific('../../../../assets/admin/css/pace.min.css', 2)
      .then(() => {
        this.styleScriptService.addStyleCitySpecific('../../../../assets/admin/css/bootstrap.min.css', 3)
        .then(() => {
          this.styleScriptService.addStyleCitySpecific('../../../../assets/admin/css/bootstrap-extended.css', 4)
          .then(() => {
            this.styleScriptService.addStyleCitySpecific('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap', 5)
            .then(() => {
              this.styleScriptService.addStyleCitySpecific('../../../../assets/admin/css/app.css', 6)
              .then(() => {
                this.styleScriptService.addStyleCitySpecific('../../../../assets/admin/css/icons.css', 7)
                .then(() => {
                  resolve();
                })
              })
            })
          })
        })
      });
    });

    const scriptPromise = new Promise<void>((resolve, reject) => {
      this.styleScriptService.addScriptCitySpecific('../../../../assets/admin/js/pace.min.js', 5)
      .then(() => {
        resolve();
      })
    })

    Promise.all([stylePromise, scriptPromise])
      .then(() => {
        //Despues
      })
      .catch(error => {
        console.error('Error cargando recursos:', error);
      });
  }

  resetearClave(){
    this.cargando = true;

    const _resetPassword: Reset_Password  = {
      correo: this.formulario.value.correo
    }

    this.accesoService.resetearClave(_resetPassword).subscribe({
      next: (response) => {
        if(response.status){
          this.cargando = false;
          this.notificacionesService.notifiSuccess("Clave reestablecida correctamente, revise su correo");
          this.router.navigate(['/admin/login']);
        }          
      },
      error: (error) => {
        this.cargando = false;
        this.notificacionesService.notifiWarning(error.error.msg);
      }
    })

    
  }

  ngOnDestroy(): void {
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeStyles(2);

    this.styleScriptService.removeScripts(5);
  }

}
