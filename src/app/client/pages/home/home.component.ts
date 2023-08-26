import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from 'src/app/admin/interfaces/categoria-management';
import { MarcaService } from '../../services/marca.service';
import { Marca } from 'src/app/admin/interfaces/marca-management';
import { ProductoService } from '../../services/producto.service';
import { Producto } from 'src/app/admin/interfaces/producto-management';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  productoActivos: Producto[] = [];
  categoriasActivas: Categoria[] = [];
  marcasPorCategoriasActicas: Marca[] = [];
  cargando: boolean = false;
  idCategoriaSeleccionada: number = 0;
  idMarcaSeleccionada: number = 0;

  constructor(private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private productoService: ProductoService){
    }

  ngOnInit(): void {
    this.listarCategoriasActivas();
    this.listarProductosActivos();
  }

  mostrarProductoPorCategoriaYMarca(idMarca: number){
    this.idMarcaSeleccionada = idMarca;
  }

  listarProductosActivos(idCategoria: number = 0, idMarca: number = 0){
    this.productoService.listarProductoActivos(this.idCategoriaSeleccionada, this.idMarcaSeleccionada).subscribe({
      next: (response) => {
        if(response.status){
          this.productoActivos = response.data;
        }
      }
    });
  }

  listarCategoriasActivas(){
    this.categoriaService.listarActivos().subscribe({
      next: (response) => {
        if(response.status){
          this.categoriasActivas = response.data;
        }
      }
    });

    this.mostrarMarcasPorCategoria(0);
  }

  mostrarMarcasPorCategoria(idCategoria: number){
    this.cargando = true;
    this.marcaService.listarMarcasPorCategoria(idCategoria).subscribe({
      next: (response) => {
        if(response.status){
          if(response.data){
            this.cargando = false
            this.marcasPorCategoriasActicas = response.data;
            this.idCategoriaSeleccionada = idCategoria;
            this.idMarcaSeleccionada = 0;
          }else{
            this.cargando = false;
            this.marcasPorCategoriasActicas = [];
          }
        }
      }
    });
  }

  aplicarCambios(){
    this.listarProductosActivos(this.idCategoriaSeleccionada, this.idMarcaSeleccionada);
  }

}
