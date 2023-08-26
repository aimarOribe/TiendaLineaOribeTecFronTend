import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StyleScriptService } from '../../../shared/services/style-script.service';
import { Router } from '@angular/router';
import { NotificacionesService } from '../../../shared/services/notificaciones.service';
import { AccesoService } from '../../services/acceso.service';
import { New_Password } from '../../interfaces/new-password';
import { UsuarioInformacionService } from '../../services/usuario-informacion.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit, OnDestroy{

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
        claveAntigua: ["", Validators.required],
        claveNueva: ["", Validators.required],
        confirmarClaveNueva: ["", Validators.required]
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

  nuevaClave(){
    this.cargando = true;

    var claveAntigua = this.formulario.value.claveAntigua;
    var claveNueva = this.formulario.value.claveNueva;
    var confirmarClaveNueva = this.formulario.value.confirmarClaveNueva;

    if(claveNueva !== confirmarClaveNueva){
      this.cargando = false;
      this.notificacionesService.notifiWarning("Las contraseñas nuevas no son iguales");
    }else{
      const _newPassword: New_Password  = {
        idUsuario: this.usuarioInformacionService.getUserId(),
        claveAntigua: claveAntigua,
        claveNueva: claveNueva
      }
      this.accesoService.nuevaClave(_newPassword).subscribe({
        next: (response) => {
          if(response.status){
            this.cargando = false;
            this.notificacionesService.notifiSuccess("Clave Configurada Correctamente");
            this.router.navigate(['/admin']);
          }          
        },
        error: (error) => {
          this.cargando = false;
          this.notificacionesService.notifiWarning(error.error.msg);
        }
      })
    }
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
