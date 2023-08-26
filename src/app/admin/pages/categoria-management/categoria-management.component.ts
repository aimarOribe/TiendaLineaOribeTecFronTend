import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificacionesService } from 'src/app/shared/services/notificaciones.service';
import Swal from 'sweetalert2';
import { CategoriaManagementService } from '../../services/categoria-management.service';
import { Categoria } from '../../interfaces/categoria-management';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categoria-management',
  templateUrl: './categoria-management.component.html',
  styleUrls: ['./categoria-management.component.css']
})
export class CategoriaManagementComponent implements OnInit {

  formulario: FormGroup;
  listaCategorias: Categoria[] = [];
  dataTabla: any;
  cargando: boolean = false;
  modal!: NgbModalRef;

  constructor(private fb: FormBuilder,
    private categoriaManagementService: CategoriaManagementService,
    private notificacionesService: NotificacionesService,
    private modalService: NgbModal){
      this.formulario = this.fb.group({
        idCategoria: [0],
        descripcion: ["", Validators.required],
        activo: ["", Validators.required]
      })
    }

  ngOnInit(): void {
    this.listarCategorias();
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

  listarCategorias(){
    this.categoriaManagementService.listar().subscribe({
      next: (response) => {
        if(response.status){
          this.listaCategorias = response.data;
        }
      },
      error: (error) => console.log(error)
    })
  }

  guardar(){

    this.cargando = true;

    const _categoria: Categoria = {
      idCategoria: this.formulario.value.idCategoria == null ? 0 : this.formulario.value.idCategoria,
      descripcion: this.formulario.value.descripcion,
      activo: this.formulario.value.activo
    };

    if(_categoria.idCategoria == 0){
      this.categoriaManagementService.registrar(_categoria).subscribe({
        next: (response) => {
          if(response.status){
            this.cargando = false;
            this.listarCategorias();
            this.cerrarModal()
            this.notificacionesService.notificacionSuccess("Categoria Agregada Correctamente");
          }
        },
        error: (error) => {
          this.cargando = false;
          this.cerrarModal()
          this.notificacionesService.notificacionWarning(error.error.msg);
        }
      })
    }else{
      this.categoriaManagementService.editar(_categoria).subscribe({
        next: (response) => {
          if(response.status){
            this.cargando = false;
            this.listarCategorias();
            this.cerrarModal()
            this.notificacionesService.notificacionSuccess("Categoria Editada Correctamente");
          }
        },
        error: (error) => {
          this.cargando = false;
          this.cerrarModal()
          this.notificacionesService.notificacionWarning(error.error.msg);
        }
      })
    }
  }

  editar(modalCategoria: any, categroia: Categoria){
    this.abrirModal(modalCategoria);
    this.formulario.patchValue({
      idCategoria: categroia.idCategoria,
      descripcion: categroia.descripcion,
      activo: categroia.activo.toString()
    });
  }

  eliminar(categroia: Categoria){
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminar la categoria ${categroia.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaManagementService.eliminar(categroia).subscribe({
          next: (response) => {
            if(response.status){
              this.cargando = false;
              this.listarCategorias();
              this.notificacionesService.notificacionSuccess("Categoria Eliminada Correctamente");
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
