import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'
import { ProductoCarrito } from '../interfaces/producto-client';
import { NotificacionesService } from 'src/app/shared/services/notificaciones.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  products: ProductoCarrito[] = [];

  constructor(private notificacionesServicio: NotificacionesService) { }

  private cartSubject = new BehaviorSubject<ProductoCarrito[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

  get totalAction$(): Observable<number>{
    return this.totalSubject.asObservable();
  }

  get quantitylAction$(): Observable<number>{
    return this.quantitySubject.asObservable();
  }

  get cartAction$(): Observable<ProductoCarrito[]>{
    return this.cartSubject.asObservable();
  }

  updateCart(product: ProductoCarrito, quantity: number): void {
    this.addToCart(product, quantity);
    this.quantityProducts();
    this.calcTotal();
  }

  updateCartMinus(product: ProductoCarrito, quantity: number): void {
    this.MinusToCart(product, quantity);
    this.quantityProducts();
    this.calcTotal();
  }

  removeitem(product: ProductoCarrito): void {
    this.RemoveItemCart(product);
    this.quantityProducts();
    this.calcTotal();
  }

  resetCart(){
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quantitySubject.next(0);
    this.products = [];
  }

  private calcTotal(): void{
    const total = this.products.reduce((acc, prod) => acc += (prod.precio * prod.cantidad), 0)
    this.totalSubject.next(total);
  }

  private quantityProducts(): void{
    const quantity = this.products.reduce((acc, prod) => acc += prod.cantidad, 0)
    this.quantitySubject.next(quantity);
  }

  private addToCart(product: ProductoCarrito, quantity: number): void {
    const isProductInCart = this.products.find(({idProducto}) => idProducto === product.idProducto);
    if(isProductInCart){
      const cantidadRequerida = isProductInCart.cantidad + quantity;
      if(cantidadRequerida > parseInt(isProductInCart.stock)){
        this.notificacionesServicio.notificacionWarning(`Solo puede comprar como maximo ${isProductInCart.stock} ${isProductInCart.nombre}` );
      }else{
        isProductInCart.cantidad = isProductInCart.cantidad + quantity;
        this.notificacionesServicio.notificacionSuccess(`Se agrego ${quantity} ${isProductInCart.nombre} a tu carrito`);
      }
    }else{
      this.products.push({...product, cantidad: quantity})
      this.notificacionesServicio.notificacionSuccess(`${product.nombre} agregado correctamente a tu carrito`);
    }
    this.cartSubject.next(this.products);
  }

  public MinusToCart(product: ProductoCarrito, quantity: number): void {
    const isProductInCart = this.products.find(({idProducto}) => idProducto === product.idProducto);
    if(isProductInCart){
      const cantidadRequerida = isProductInCart.cantidad - quantity;
      if(cantidadRequerida <= 0){
        this.products = this.products.filter(p => p.idProducto != isProductInCart.idProducto);
        this.notificacionesServicio.notificacionWarning(`Se elimino ${isProductInCart.nombre} de tu carrito`);
      }else{
        isProductInCart.cantidad = isProductInCart.cantidad - quantity;
        this.notificacionesServicio.notificacionSuccess(`Se elimino ${quantity} ${isProductInCart.nombre} de tu carrito`);
      }
    }
    this.cartSubject.next(this.products);
  }

  public RemoveItemCart(product: ProductoCarrito): void {
    const isProductInCart = this.products.find(({idProducto}) => idProducto === product.idProducto);
    if(isProductInCart){
      this.products = this.products.filter(p => p.idProducto != isProductInCart.idProducto);
        this.notificacionesServicio.notificacionWarning(`Se elimino ${isProductInCart.nombre} de tu carrito`);
    }
    this.cartSubject.next(this.products);
  }

}
