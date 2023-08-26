import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { ProductoCarrito } from '../../interfaces/producto-client';
import { NotificacionesService } from 'src/app/shared/services/notificaciones.service';
import { ClienteInformacionService } from '../../services/cliente-informacion.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  quantity: number = 1;

  producto: ProductoCarrito = {
    idProducto: 0,
    nombre: "",
    decripcion: "",
    idMarca: "",
    descripcionMarca: "",
    idCategoria: 0,
    descripcionCategoria: "",
    precio: 0,
    stock: "",
    rutaImagen: "",
    nombreImagen: "",
    activo: false,
    cantidad: 0
  };

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private notificacionesService: NotificacionesService,
    private clienteInformacionService: ClienteInformacionService){
      
    }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const idProducto = params.get('idProducto');
      if(idProducto != null){
        this.obtenerProductoPorId(parseInt(idProducto));
      }
    });
  }

  aumentarQuantity() {
    if(this.quantity < parseInt(this.producto.stock)){
      this.quantity++;
    }else{
      this.notificacionesService.notificacionWarning(`Solo puede comprar como maximo ${this.producto.stock} ${this.producto.nombre}`);
    }
  }

  disminuirQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  obtenerProductoPorId(idProducto: number){
    this.productoService.obtenerPorId(idProducto).subscribe({
      next: (response) => {
        if(response.status){
          this.producto = response.data;
        }
      }
    })
  }

  agregarAlCarrito(){
    if(this.clienteInformacionService.isAuthenticated()){
      this.carritoService.updateCart(this.producto, this.quantity);
      this.quantity = 1;
    }else{
      this.notificacionesService.notifiIniciarSesionCancel();
    }
  }

}
