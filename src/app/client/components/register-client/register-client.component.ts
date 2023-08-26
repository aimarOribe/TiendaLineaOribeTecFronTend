import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificacionesService } from 'src/app/shared/services/notificaciones.service';
import { Cliente } from '../../interfaces/client';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent {

  formulario: FormGroup;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificacionesService: NotificacionesService,
    private clienteService: ClienteService) {

      this.formulario = this.fb.group({
        idCliente: ["0"],
        nombres: ["", [Validators.required]],
        apellidos: ["", [Validators.required]],
        correo: ["", [Validators.required, Validators.email]]
      })
    }

  registrar(){
    this.cargando = true;

    const _cliente: Cliente  = {
      idCliente: 0,
      nombres: this.formulario.value.nombres,
      apellidos: this.formulario.value.apellidos,
      correo: this.formulario.value.correo,
      clave: "",
    }

    this.clienteService.registrar(_cliente).subscribe({
      next: (response) => {
        if(response.status){
          this.cargando = false;
          this.router.navigate(['/login']);    
        }
      },
      error: (error) => {
        this.cargando = false;
        console.log(error);
        this.notificacionesService.notifiWarning(error);
      }
    })
  }

}
