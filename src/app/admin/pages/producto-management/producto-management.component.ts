import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Marca } from '../../interfaces/marca-management';
import { Categoria } from '../../interfaces/categoria-management';
import { Producto } from '../../interfaces/producto-management';
import { MarcaManagementService } from '../../services/marca-management.service';
import { CategoriaManagementService } from '../../services/categoria-management.service';
import { ProductoManagementService } from '../../services/producto-management.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-management',
  templateUrl: './producto-management.component.html',
  styleUrls: ['./producto-management.component.css']
})
export class ProductoManagementComponent implements AfterViewInit, OnInit {

  modelo: any = {};
  inputFoto?: HTMLInputElement;
  imagenSeleccionada: string | ArrayBuffer | null = "https://firebasestorage.googleapis.com/v0/b/aplicacionecommerce-9af45.appspot.com/o/IMAGENES_PRODUCTO%2Fproducto.png?alt=media&token=0f903d7c-8a02-4833-9cf7-a38ee8d55615";
  modal!: NgbModalRef;
  formulario: FormGroup;
  listaMarcas: Marca[] = [];
  listaCategorias: Categoria[] = [];
  listaProductos: Producto[] = [];
  dataTabla: any;
  cargando: boolean = false;
  borrando: boolean = false;

  constructor(private fb: FormBuilder,
    private marcaManagementService: MarcaManagementService,
    private categoriaManagementService: CategoriaManagementService,
    private productoManagementService: ProductoManagementService,
    private notificacionesService: NotificacionesService,
    private modalService: NgbModal){
      this.formulario = this.fb.group({
        idProducto: [0],
        nombre: ["", Validators.required],
        decripcion: ["", Validators.required],
        idMarca: [0, Validators.required],
        idCategoria: [0, Validators.required],
        precio: ["", Validators.required],
        stock: ["", Validators.required],
        activo: ["", Validators.required]
      })
    }

  ngOnInit(): void {
    this.listarProductos();
    this.listarMarcas();
    this.listarCategorias();
  }

  ngAfterViewInit(): void {
    this.inputFoto = document.getElementById('txtImagen') as HTMLInputElement;
  }
  
  abrirModal(content: any){
    this.modal = this.modalService.open(content, { centered: true, backdropClass: 'light-blue-backdrop' })    
  }

  limpiarModal(){
    this.imagenSeleccionada = "https://firebasestorage.googleapis.com/v0/b/aplicacionecommerce-9af45.appspot.com/o/IMAGENES_PRODUCTO%2Fproducto.png?alt=media&token=0f903d7c-8a02-4833-9cf7-a38ee8d55615";
    if (this.inputFoto?.files != undefined) {
      this.inputFoto!.value = "";
    }
    this.formulario.reset();
  }

  cerrarModal(){
    this.modal.close();
    this.limpiarModal();
  }

  listarProductos(){
    this.productoManagementService.listar().subscribe({
      next: (response) => {
        if(response.status){
          this.listaProductos = response.data;
        }
      },
      error: (error) => console.log(error)
    })
  }

  listarMarcas(){
    this.marcaManagementService.listar().subscribe({
      next: (response) => {
        if(response.status){
          this.listaMarcas = response.data;
        }
      },
      error: (error) => {
        this.notificacionesService.notificacionWarning(error.error.msg);
      }
    })
  }

  listarCategorias(){
    this.categoriaManagementService.listar().subscribe({
      next: (response) => {
        if(response.status){
          this.listaCategorias = response.data;
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

    this.modelo.idProducto = this.formulario.value.idProducto == null ? 0 : this.formulario.value.idProducto;
    this.modelo.nombre = this.formulario.value.nombre;
    this.modelo.decripcion = this.formulario.value.decripcion;
    this.modelo.idMarca = this.formulario.value.idMarca;
    this.modelo.descripcionMarca = "";
    this.modelo.idCategoria = this.formulario.value.idCategoria;
    this.modelo.descripcionCategoria = "";
    this.modelo.precio = this.formulario.value.precio;
    this.modelo.stock = this.formulario.value.stock;
    this.modelo.activo = this.formulario.value.activo;

    const formData = new FormData();

    formData.append("producto", JSON.stringify(this.modelo));

    if (this.inputFoto?.files != undefined) {
      formData.append('imagen', this.inputFoto!.files![0]);
    }

    if(this.modelo.idProducto == 0){
      this.productoManagementService.registrar(formData).subscribe({
        next: (response) => {
          if(response.status){
            this.cargando = false;
            this.listarProductos();
            this.cerrarModal();
            this.notificacionesService.notificacionSuccess("Producto Agregado Correctamente");
          }
        },
        error: (error) => {
          this.cargando = false;
          this.cerrarModal();
          this.notificacionesService.notificacionWarning(error.error.msg);
        }
      })
    }else{
      this.productoManagementService.editar(formData).subscribe({
        next: (response) => {
          if(response.status){
            this.cargando = false;
            this.listarProductos();
            this.cerrarModal();
            this.notificacionesService.notificacionSuccess("Producto Editado Correctamente");
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

  editar(modalCategoria: any ,producto: Producto){
    this.abrirModal(modalCategoria);

    this.formulario.patchValue({
      idProducto: producto.idProducto,
      nombre: producto.nombre,
      decripcion: producto.decripcion,
      idMarca: producto.idMarca,
      idCategoria: producto.idCategoria,
      precio: producto.precio,
      stock: producto.stock,
      activo: producto.activo.toString(),
    });

    this.imagenSeleccionada = producto.rutaImagen!;
  }

  eliminar(producto: Producto){
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estas seguro de eliminar a ${producto.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrando = true;
        this.productoManagementService.eliminar(producto).subscribe({
          next: (response) => {
            if(response.status){
              this.borrando = false;
              this.listarProductos();
              this.notificacionesService.notificacionSuccess("Producto Eliminado Correctamente");
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
