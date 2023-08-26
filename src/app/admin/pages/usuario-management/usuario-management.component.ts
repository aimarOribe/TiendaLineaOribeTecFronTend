import { Component, OnInit, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RolManagementService } from '../../services/rol-management.service';
import { Rol } from '../../interfaces/rol-management';
import { UsuarioManagementService } from '../../services/usuario-management.service';
import { Usuario } from '../../interfaces/usuario-management';
import { NotificacionesService } from 'src/app/shared/services/notificaciones.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-management',
  templateUrl: './usuario-management.component.html',
  styleUrls: ['./usuario-management.component.css']
})
export class UsuarioManagementComponent implements OnInit, AfterViewInit {

  modelo: any = {};
  inputFoto?: HTMLInputElement;
  imagenSeleccionada: string | ArrayBuffer | null = "https://firebasestorage.googleapis.com/v0/b/aplicacionecommerce-9af45.appspot.com/o/IMAGENES_USUARIO%2Fusuario.png?alt=media&token=52ac3116-043d-4e26-9435-80cdd8cac5df";
  modal!: NgbModalRef;
  formulario: FormGroup;
  listaRoles: Rol[] = [];
  listaUsuarios: Usuario[] = [];
  dataTabla: any;
  cargando: boolean = false;
  borrando: boolean = false;

  constructor(private fb: FormBuilder,
    private rolManagementService: RolManagementService,
    private usuarioManagementService: UsuarioManagementService,
    private notificacionesService: NotificacionesService,
    private modalService: NgbModal){
      this.formulario = this.fb.group({
        idUsuario: ["0"],
        nombres: ["", [Validators.required]],
        apellidos: ["", [Validators.required]],
        correo: ["", [Validators.required, Validators.email]],
        idRol: ["", [Validators.required]],
        activo: ["",[Validators.required]]
      })
    }

  ngOnInit(): void {
    this.listarUsuarios();
    this.listarRoles();
  }
  
  ngAfterViewInit(): void {
    this.inputFoto = document.getElementById('txtImagen') as HTMLInputElement;
  }

  abrirModal(content: any){
    this.modal = this.modalService.open(content, { centered: true, backdropClass: 'light-blue-backdrop' })    
  }

  limpiarModal(){
    this.imagenSeleccionada = "https://firebasestorage.googleapis.com/v0/b/aplicacionecommerce-9af45.appspot.com/o/IMAGENES_USUARIO%2Fusuario.png?alt=media&token=52ac3116-043d-4e26-9435-80cdd8cac5df";
    if (this.inputFoto?.files != undefined) {
      this.inputFoto!.value = "";
    }
    this.formulario.reset();
  }

  cerrarModal(){
    this.modal.close();
    this.limpiarModal();
  }

  listarUsuarios(){
    this.usuarioManagementService.obtenerUsuarios().subscribe({
      next: (response) => {
        if(response.status){
          this.listaUsuarios = response.data;
        }
      },
      error: (error) => console.log(error)
    })
  }

  listarRoles(){
    this.rolManagementService.obtenerUsuarios().subscribe({
      next: (response) => {
        if(response.status){
          this.listaRoles = response.data;
        }
      },
      error: (error) => {
        this.notificacionesService.notificacionWarning(error.error.msg);
      }
    })
  }

  onFileChange(event: any) {
    this.inputFoto = event.target as HTMLInputElement;
    const file = this.inputFoto.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenSeleccionada = e.target!.result;
      };
      reader.readAsDataURL(file);
    }
  }

  guardar(){

    this.cargando = true;

    this.modelo.idUsuario = this.formulario.value.idUsuario == null ? 0 : this.formulario.value.idUsuario
    this.modelo.nombres = this.formulario.value.nombres;
    this.modelo.apellidos = this.formulario.value.apellidos;
    this.modelo.correo = this.formulario.value.correo;
    this.modelo.idRol = this.formulario.value.idRol;
    this.modelo.rolDescripcion = "";
    this.modelo.activo = this.formulario.value.activo;

    const formData = new FormData();

    formData.append("usuario", JSON.stringify(this.modelo));

    if (this.inputFoto?.files != undefined) {
      formData.append('imagen', this.inputFoto!.files![0]);
    }

    if(this.modelo.idUsuario == 0){
      this.usuarioManagementService.registrar(formData).subscribe({
        next: (response) => {
          if(response.status){
            this.cargando = false;
            this.listarUsuarios();
            this.cerrarModal();
            this.notificacionesService.notificacionSuccess("Usuario Agregador Correctamente");
          }
        },
        error: (error) => {
          this.cargando = false;
          this.cerrarModal();
          this.notificacionesService.notificacionWarning(error.error.msg);
        }
      })
    }else{
      this.usuarioManagementService.editar(formData).subscribe({
        next: (response) => {
          if(response.status){
            this.cargando = false;
            this.listarUsuarios();
            this.cerrarModal();
            this.notificacionesService.notificacionSuccess("Usuario Editado Correctamente");
          }
        },
        error: (error) => {
          this.cargando = false;
          this.cerrarModal();
          this.notificacionesService.notificacionWarning(error.error.msg);
        }
      })
    }
  }

  editar(modalUsuario:any, usuario: Usuario){
    this.abrirModal(modalUsuario);

    this.formulario.patchValue({
      idUsuario: usuario.idUsuario,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      idRol: usuario.idRol,
      activo: usuario.activo.toString()
    });

    this.imagenSeleccionada = usuario.rutaImagen!;
  }

  eliminar(usuario: Usuario){
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estas seguro de eliminar a ${usuario.nombres} ${usuario.apellidos}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrando = true;
        this.usuarioManagementService.eliminar(usuario).subscribe({
          next: (response) => {
            if(response.status){
              this.borrando = false;
              this.listarUsuarios();
              this.notificacionesService.notificacionSuccess("Usuario Eliminado Correctamente");
            }
          },         
          error: (error) => {
            this.borrando = false;
            this.notificacionesService.notificacionWarning(error.error.msg);
          }
        })
      }
    });
  }
}
