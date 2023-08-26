import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StyleScriptService } from '../../../shared/services/style-script.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccesoService } from '../../services/acceso.service';
import { NotificacionesService } from '../../../shared/services/notificaciones.service';
import { Login } from '../../interfaces/login';
import { UsuarioInformacionService } from '../../services/usuario-informacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  formulario: FormGroup;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private styleScriptService: StyleScriptService,
    private route: ActivatedRoute,
    private router: Router,
    private notificacionesService: NotificacionesService,
    private accesoService: AccesoService,
    private usuarioInformacionService: UsuarioInformacionService) {
      
      if(this.usuarioInformacionService.isAuthenticated()){
        this.router.navigate(['admin']);
      }

      this.formulario = this.fb.group({
        correo: ["", [Validators.required, Validators.email]],
        clave: ["", Validators.required]
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
        this.addWindowLoadEvent();
      })
      .catch(error => {
        console.error('Error cargando recursos:', error);
      });
  }

  addWindowLoadEvent(): void {
    // Obtén la ruta actual
    const currentRoute = this.route.snapshot.routeConfig?.path;

    // Verifica si estás en la página donde deseas agregar el script
    if (currentRoute === '') {
      const datePicker = `
        $("#show_hide_password a").on('click', function (event) {
          event.preventDefault();
          if ($('#show_hide_password input').attr("type") == "text") {
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass("bx-hide");
            $('#show_hide_password i').removeClass("bx-show");
          } else if ($('#show_hide_password input').attr("type") == "password") {
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass("bx-hide");
            $('#show_hide_password i').addClass("bx-show");
          }
        });
      `;
      this.styleScriptService.addMultiLineScriptAtLocation(datePicker, 11);
    }
  }

  inicarSesion(){
    this.cargando = true;

    const _login: Login  = {
      correo: this.formulario.value.correo,
      clave: this.formulario.value.clave
    }
    this.accesoService.iniciarSesion(_login).subscribe({
      next: (response) => {
        if(response.status){
          this.cargando = false;
          this.usuarioInformacionService.setSesion(response.data);
          if(response.data.reestablecer){
            this.router.navigate(['/admin/new-password'])
          }else{
            this.router.navigate(['/admin']);
            /*this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
              window.location.reload();
            });*/
          }         
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
