import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { CarritoService } from '../../services/carrito.service';
import { ProductoCarrito } from '../../interfaces/producto-client';
import { UbicacionVentaService } from '../../services/ubicacion-venta.service';
import { Departamento, Distrito, Provincia } from '../../interfaces/ubicacion-venta';
import { DetalleVenta, Venta } from '../../interfaces/venta';
import { ClienteInformacionService } from '../../services/cliente-informacion.service';
import { VentaService } from '../../services/venta.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CarritoPaypal, Unit_amount } from '../../interfaces/paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean = false;
  montoTotal: string = "";
  productos: CarritoPaypal[] = [];
  idTransaccion: string = "";

  listarDepartamentos: Departamento[] = [];
  listarProvincias: Provincia[] = [];
  listarDistritos: Distrito[] = [];

  idDepartamento: string = "";
  idProvincia: string = "";
  idDistrito: string = "";

  formulario: FormGroup;
  cargando: boolean = false;

  quantity$ = this.carritoService.quantitylAction$;
  total$ = this.carritoService.totalAction$;
  cart$ = this.carritoService.cartAction$;

  constructor(
    private fb: FormBuilder,
    private carritoService: CarritoService,
    private ubicacionVentaService: UbicacionVentaService,
    private clienteInformacionService: ClienteInformacionService,
    private ventaService: VentaService,
    private notificacionService: NotificacionesService,
    private router: Router){
      this.formulario = this.fb.group({
        idDepartamento: ["", Validators.required],
        idProvincia: ["", Validators.required],
        idDistrito: ["", Validators.required],
        contacto: ["", Validators.required],
        direccion: ["", Validators.required],
        telefono: ["", Validators.required]
      })
      this.obtenerMontoTotalCarrito();
      this.obtenerProductosCarrito();
      this.listaDepartamentos();
      this.initConfigPaypal();
    }
  

  private obtenerMontoTotalCarrito(){
    this.total$.subscribe({
      next: (response) => {
        this.montoTotal = response.toString();
      }
    })
  }

  private obtenerProductosCarrito(){
    this.cart$.subscribe({
      next: (response) => {
        this.productos = []; // Limpia el arreglo antes de llenarlo nuevamente
        response.forEach(producto => {
          var plantilla: CarritoPaypal = {
            name: producto.nombre,
            quantity: producto.cantidad.toString(),
            unit_amount: {
              currency_code: 'USD',
              value: producto.precio.toString()
            }
          };
          this.productos.push(plantilla); // Agrega la instancia actual al arreglo
        });
      }
    })
  }

  private initConfigPaypal(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: `${environment.clientId}`,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: `${this.montoTotal}`,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: `${this.montoTotal}`
                }
              }
            },
            items: this.productos
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data: any) => {
        this.showSuccess = true;
        if(data.status === "COMPLETED"){
          this.idTransaccion = data.purchase_units[0].payments.captures[0].id;
          this.comprar();
        }
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    }
  };

  aumentarQuantity(item: ProductoCarrito){
    this.carritoService.updateCart(item, 1);
  }

  disminuirQuantity(item: ProductoCarrito){
    this.carritoService.updateCartMinus(item, 1);
  }

  eliminarProducto(item: ProductoCarrito){
    this.carritoService.removeitem(item);
  }

  listaDepartamentos(){
    this.ubicacionVentaService.listarDepartamentos().subscribe({
      next: (response) => {
        this.listarDepartamentos = response.data;
      }
    })
  }

  listaProvincias(){
    this.ubicacionVentaService.listarProvincias(this.idDepartamento).subscribe({
      next: (response) => {
        this.listarProvincias = response.data;
      }
    })
  }

  listaDistrito(){
    this.ubicacionVentaService.listarDistritos(this.idProvincia, this.idDepartamento).subscribe({
      next: (response) => {
        this.listarDistritos = response.data;
      }
    })
  }

  departamentoSeleccionado(){
    this.idDepartamento = this.formulario.value.idDepartamento;
    this.listaProvincias();
  }

  provinciaSeleccionada(){
    this.idProvincia = this.formulario.value.idProvincia;
    this.listaDistrito();
  }

  distritoSeleccionado(){
    this.idDistrito = this.formulario.value.idDistrito;
  }

  comprar(){

    this.cargando = true;

    var totalProducto = 0;
    var montoTotal = "";
    var detalleVenta: DetalleVenta[] = [];

    this.quantity$.subscribe({
      next: (response) => {
        totalProducto = response;
      }
    })

    this.total$.subscribe({
      next: (response) => {
        montoTotal = response.toString()
      }
    })

    this.cart$.subscribe({
      next: (response) => {
        response.forEach(p => {
          var idProducto = p.idProducto;
          var descripcionProducto = p.nombre;
          var cantidad = p.cantidad;
          var precioTexto = p.precio;
          var totalTexto = (p.cantidad * p.precio).toString()
          var plantilla: DetalleVenta = {
            idProducto,
            descripcionProducto,
            cantidad,
            precioTexto,
            totalTexto
          }
          detalleVenta.push(plantilla)
        });
      }
    })

    const _venta: Venta  = {
      idVenta: 0,
      idCliente: this.clienteInformacionService.getUserId(),
      descripcionCliente: "",
      totalProducto: totalProducto,
      montoTotalTexto: montoTotal,
      contacto: this.formulario.value.contacto,
      idDistrito: this.formulario.value.idDistrito,
      telefono: this.formulario.value.telefono,
      direccion: this.formulario.value.direccion,
      idTransaccion: this.idTransaccion,
      detalleVenta: detalleVenta
    }

    this.ventaService.registrar(_venta).subscribe({
      next: (response) => {
        if(response.status){
          this.cargando = false;
          this.carritoService.resetCart();
          this.notificacionService.notificacionCompraAceptada(this.idTransaccion);
        }
      },
      error: (error) => {
        this.cargando = false;
        this.notificacionService.notificacionWarning(error.error.msg);
      }
    });

  }

}
