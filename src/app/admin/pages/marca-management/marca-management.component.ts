import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificacionesService } from 'src/app/shared/services/notificaciones.service';
import Swal from 'sweetalert2';
import { MarcaManagementService } from '../../services/marca-management.service';
import { Marca } from '../../interfaces/marca-management';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-marca-management',
  templateUrl: './marca-management.component.html',
  styleUrls: ['./marca-management.component.css']
})
export class MarcaManagementComponent implements OnInit {

  formulario: FormGroup;
  listaMarcas: Marca[] = [];
  dataTabla: any;
  cargando: boolean = false;
  modal!: NgbModalRef;

  constructor(private fb: FormBuilder,
    private marcaManagementService: MarcaManagementService,
    private notificacionesService: NotificacionesService,
    private modalService: NgbModal){
      this.formulario = this.fb.group({
        idMarca: [0],
        descripcion: ["", Validators.required],
        activo: ["", Validators.required]
      })
    }

  ngOnInit(): void {
    this.listarMarcas();
  }

  abrirModal(content: any){
    this.modal = this.modalService.open(content, { centered: true, backdropClass: 'light-blue-backdrop' })    
  }

  limpiarModal(){
    this.formulario.reset();
  }

  cerrarModal(){
    this.modal.close();
    this.limpiarModal();
  }

  listarMarcas(){
    this.marcaManagementService.listar().subscribe({
      next: (response) => {
        if(response.status){
          this.listaMarcas = response.data;
        }
      },
      error: (error) => {
        this.notificacionesService.notifiWarning(error.error.msg);
      }
    })
  }

  guardar(){

    this.cargando = true;

    const _marca: Marca = {
      idMarca: this.formulario.value.idMarca == null ? 0 : this.formulario.value.idMarca,
      descripcion: this.formulario.value.descripcion,
      activo: this.formulario.value.activo
    };

    if(_marca.idMarca == 0){
      this.marcaManagementService.registrar(_marca).subscribe({
        next: (response) => {
          if(response.status){
            this.cargando = false;
            this.listarMarcas();
            this.cerrarModal();
            this.notificacionesService.notificacionSuccess("Marca Agregada Correctamente");
          }
        },
        error: (error) => {
          this.cargando = false;
          this.cerrarModal();
          this.notificacionesService.notificacionWarning(error.error.msg);
        }
      })
    }else{
      this.marcaManagementService.editar(_marca).subscribe({
        next: (response) => {
          if(response.status){
            this.cargando = false;
            this.listarMarcas();
            this.cerrarModal();
            this.notificacionesService.notificacionSuccess("Marca Editada Correctamente");
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

  editar(modalMarca: any, marca: Marca){
    this.abrirModal(modalMarca);
    this.formulario.patchValue({
      idMarca: marca.idMarca,
      descripcion: marca.descripcion,
      activo: marca.activo.toString()
    });
  }

  eliminar(marca: Marca){
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminar la categoria ${marca.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.marcaManagementService.eliminar(marca).subscribe({
          next: (response) => {
            if(response.status){
              this.cargando = false;
              this.listarMarcas();
              this.notificacionesService.notificacionSuccess("Marca Eliminada Correctamente");
            }
          },
          error: (error) => {
            this.cargando = false;
            this.notificacionesService.notificacionWarning(error.error.msg);
          }
        })
      }
    });
  }
}
